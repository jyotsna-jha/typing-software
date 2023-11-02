"use client"
import { useState, useEffect } from "react";
import { FaHourglassStart, FaRedo } from "react-icons/fa";

const EnglishTyping = () => {
  const [englishText, setEnglishText] = useState("");
  const [randomText, setRandomText] = useState("");
  const [timer, setTimer] = useState(60);
  const [isTyping, setIsTyping] = useState(false);

  const [reset, setReset] = useState(false);

  const generateRandomText = () => {
    const randomText = "Your sample text here...This is a sample text for your typing practice. Feel free to start typing and improve your English skills. You can change this text to anything you like. Just have fun practicing! . Feel free to start typing and improve your English skills. Feel free to start typing and improve your English skills. Feel free to start typing and improve your English skills. Feel free to start typing and improve your English skills. Feel free to start typing and improve your English skills.. Feel free to start typing and improve your English skills. Feel free to start typing and improve your English skills. Feel free to start typing and improve your English skills.This is a sample text for your typing practice. Feel free to start typing and improve your English skills. You can change this text to anything you like. Just have fun practicing! . Feel free to start typing and improve your English skills. Feel free to start typing and improve your English skills. Feel free to start typing and improve your English skills. Feel free to start typing and improve your English skills. Feel free to start typing and improve your English skills.. Feel free to start typing and improve your English skills. Feel free to start typing and improve your English skills. Feel free to start typing and improve your English skills";
    setRandomText(randomText);
  };

  useEffect(() => {
    generateRandomText();
  }, []);

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setEnglishText(inputText);

    if (!isTyping) {
      setIsTyping(true);
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(countdown);
        setIsTyping(false);
      }, 60000);
    }
  };

  const handleReset = () => {
    setReset(true);
    setTimer(60);
    setEnglishText("");
    generateRandomText();
    setTimeout(() => setReset(false), 100);
  };

  const getHighlightedText = () => {
    const inputText = englishText.trim();
    const startIndex = randomText.indexOf(inputText);

    if (startIndex === -1) return randomText;

    const beforeText = randomText.substring(0, startIndex);
    const highlightedText = randomText.substring(
      startIndex,
      startIndex + inputText.length
    );
    const afterText = randomText.substring(startIndex + inputText.length);

    return (
      <div className="typing-text">
        {beforeText}
        <span className="bg-red-300">{highlightedText}</span>
        {afterText}
      </div>
    );
  };

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
        Timer: {timer} seconds
      </div>
    
      <div className="bg-white border border-gray-300 rounded p-4 mb-4 h-60 overflow-y-auto">
        {getHighlightedText()}
      </div>
      <div className="p-4">
        <textarea
          className="w-full p-4 border-2 border-gray-300 rounded focus:outline-none focus:border-red-300 focus:border-4 transition"
          rows="10"
          placeholder="Start typing in English..."
          value={englishText}
          onChange={handleInputChange}
        ></textarea>
      </div>
       <button onClick={handleReset} className="reset-button">
        <FaRedo className="text-red-500 text-2xl" />
      </button> 
    </div>
  );
};

export default EnglishTyping;
