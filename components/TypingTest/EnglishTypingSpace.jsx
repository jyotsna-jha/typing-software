// TypingSpace.js
import React, { useState, useEffect } from "react";
import TextHighlighter from "./TextHighlighter";
import { FaHourglassStart, FaRedo } from "react-icons/fa";
const EnglishTypingSpace = ({ onTestComplete }) => {
  const [userInput, setUserInput] = useState("");
  const [highlightedWordIndex, setHighlightedWordIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [hasStarted, setHasStarted] = useState(false);

  const sampleText =
    "This is a sample text for the typing test. Try to type these words correctly.";
  const words = sampleText.split(" ");

  const handleInputChange = (e) => {
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
  };

  useEffect(() => {
    if (hasStarted && timeLeft > 0) {
      const timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => {
        clearInterval(timerInterval);
      };
    }
  }, [hasStarted]); // Only depend on 'hasStarted'

  // TypingSpace.js
  useEffect(() => {
    if (timeLeft === 0) {
      const userWords = userInput.trim().split(/\s+/);
      const correctWords = userWords.filter((word, idx) => word === words[idx]);

      const totalWords = userWords.length;
      const correctWordsCount = correctWords.length;
      const accuracy = Math.floor((correctWordsCount / totalWords) * 100);

      const timeTakenInMinutes = (10 - timeLeft) / 60; // Assuming test time is 10 seconds
      const grossSpeed = Math.floor(totalWords / timeTakenInMinutes);
      const errorsPerMinute =
        (totalWords - correctWordsCount) / timeTakenInMinutes;
      const netSpeed = Math.floor(grossSpeed - errorsPerMinute);

      onTestComplete(
        totalWords,
        correctWordsCount,
        accuracy,
        grossSpeed,
        netSpeed
      );
    }
  }, [timeLeft, userInput, onTestComplete, words]);

  useEffect(() => {
    if (!userInput) {
      setHighlightedWordIndex(0);
    }
  }, [userInput]);

  return (
    <div className="w-full max-w-screen-lg mx-auto p-4 relative">
      <div className="text-center py-4">
        <h1 className="text-3xl md:text-4xl  font-semibold text-[#e74c3c]">
          English Typing
        </h1>
        <p className="text-base md:text-lg py-2 font-semibold text-gray-600">
          Practice English typing to enhance your proficiency...
        </p>
      </div>
      <div className="flex items-center  text-[#e74c3c] font-semibold text-lg mb-4">
        <FaHourglassStart className="mr-2 text-xl" />
        Timer: {timeLeft} seconds
      </div>
      <TextHighlighter sampleText={sampleText} userText={userInput} />
      <div>
        <textarea
          className="w-full p-4 border-2 border-gray-300 rounded focus:outline-none focus:border-red-300 focus:border-4 transition"
          rows="10"
          placeholder="Time will start once you start typing"
          value={userInput}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default EnglishTypingSpace;
