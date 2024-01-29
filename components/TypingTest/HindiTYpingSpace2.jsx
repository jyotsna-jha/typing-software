import React, { useState, useEffect, useRef } from "react";
import { FaHourglassStart } from "react-icons/fa";
import TextHighlighter from "./TextHighlighterH";

const HindiTypingSpace = ({
  sampleText,
  timeLimit,
  onTestComplete,
  userName,
  enableHighlight,
}) => {
  const [userInput, setUserInput] = useState("");
  const [highlightedWordIndex, setHighlightedWordIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [hasStarted, setHasStarted] = useState(false);
  const [backspaceCount, setBackspaceCount] = useState(0);
  const textAreaRef = useRef(null);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const words = sampleText.split(" ");

  const autoScroll = () => {
    const textArea = textAreaRef.current;
    const linesCompleted = (textArea.value.match(/\n/g) || []).length + 1;
    textArea.scrollTop = linesCompleted * 20;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      setBackspaceCount((prevCount) => prevCount + 1);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes > 0) {
      return `${minutes} min ${remainingSeconds} sec`;
    } else {
      return `${remainingSeconds} sec`;
    }
  };

  useEffect(() => {
    let timerInterval;

    if (hasStarted && timeLeft > 0) {
      // Adding console logs for troubleshooting
      console.log("Timer started");
      timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [hasStarted, timeLeft]); // Make sure dependencies are correct

  useEffect(() => {
    if (timeLeft === 0) {
      setEndTime(Date.now());
      onTestComplete();
    }
  }, [timeLeft, onTestComplete]);

  const handleInputChange = (e) => {
    if (timeLeft > 0) {
      setUserInput(e.target.value);

      if (!hasStarted) {
        setHasStarted(true);
      }

      if (
        e.target.value.endsWith(" ") ||
        highlightedWordIndex === words.length - 1
      ) {
        setHighlightedWordIndex((prevIndex) => prevIndex + 1);
      } else if (!e.target.value.trim()) {
        setHighlightedWordIndex(0);
      }

      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      const newTimeout = setTimeout(() => {
        processUserInput(e.target.value);
      }, 200);

      setDebounceTimeout(newTimeout);
    }
  };

  const processUserInput = (inputValue) => {
    const userWords = inputValue.trim().split(/\s+/);
    const currentWord = words[highlightedWordIndex]?.trim();
    const typedWord = userWords[highlightedWordIndex]?.trim();

    if (currentWord !== typedWord) {
      console.log("Wrong word:", typedWord);
    }

    if (currentWord === typedWord && highlightedWordIndex < words.length - 1) {
      setHighlightedWordIndex((prevIndex) => prevIndex + 1);
    } else if (
      highlightedWordIndex === words.length - 1 &&
      currentWord === typedWord
    ) {
      setEndTime(Date.now());
      onTestComplete();
    }
  };

  useEffect(() => {
    if (timeLeft === 0) {
      completeTest();
    }
  }, [timeLeft]);

  const completeTest = () => {
    const userWords = userInput.trim().split(/\s+/);
    let correctWords = [];
    let wrongWords = [];
    userWords.forEach((word, idx) => {
      if (word === words[idx]) {
        correctWords.push(word);
      } else {
        wrongWords.push({ typed: word, correct: words[idx] });
      }
    });
    const totalWords = userWords.length;
    const correctWordsCount = correctWords.length;
    const wrongWordsCount = totalWords - correctWordsCount;
    const accuracy = Math.floor((correctWordsCount / totalWords) * 100);
    const timeTakenInMinutes = (timeLimit - timeLeft) / 60;
    const grossSpeed = Math.floor(totalWords / timeTakenInMinutes);
    const errorsPerMinute = wrongWordsCount / timeTakenInMinutes;
    const netSpeed = Math.floor(grossSpeed - errorsPerMinute);

    onTestComplete(
      totalWords,
      correctWordsCount,
      wrongWordsCount,
      accuracy,
      grossSpeed,
      netSpeed,
      correctWords,
      wrongWords,
      backspaceCount
    );
  };
  return (
    <div className="w-full max-w-screen-lg mx-auto p-4 relative">
      <div className="text-center py-4">
        <h1 className="text-3xl md:text-4xl font-semibold text-[#e74c3c]">
          Hindi Typing
        </h1>
        <p className="text-base md:text-lg py-2 font-semibold text-gray-600">
          Practice Hindi typing to enhance your proficiency...
        </p>
      </div>
      <h1 className="text-base md:text-lg py-2 font-semibold text-gray-600">
        Hi {userName}
      </h1>
      <div className="flex items-center text-[#e74c3c] font-semibold text-lg mb-4">
        <FaHourglassStart className="mr-2 text-2xl" />
        Timer: {formatTime(timeLeft)}
      </div>
      {enableHighlight ? (
        <TextHighlighter sampleText={sampleText} userText={userInput} />
      ) : (
        <div className="bg-white border border-gray-300 rounded p-4 mb-4 h-60 overflow-y-auto">
          {sampleText}
        </div>
      )}
      <div>
        <textarea
          ref={textAreaRef}
          className="w-full p-4 border-2 border-gray-300 rounded focus:outline-none focus:border-red-300 focus:border-4 transition"
          rows="10"
          placeholder="समय शुरू होगा जब आप टाइपिंग करना शुरू करेंगे।"
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          style={{ fontFamily: "hindi", fontSize: "30px" }}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={completeTest}
      >
        Submit Test
      </button>
    </div>
  );
};

export default HindiTypingSpace;
