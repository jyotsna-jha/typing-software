"use client"
import React, { useState } from 'react';

const TypingTestForm = () => {
  const [username, setUsername] = useState('');
  const [duration, setDuration] = useState(1);
  const [difficulty, setDifficulty] = useState(''); 
  const [difficulties, setDifficulties] = useState(['Easy', 'Medium', 'Hard']); 

  const handleStartTest = () => {
    //logic to start the typing test
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-200 rounded-lg mb-10 font-poppins">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center text-[#222f3e]">English Test Setup</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="username" className="block font-medium text-[#222f3e]">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 text-sm sm:text-base"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="duration" className="block font-medium text-[#222f3e]">Select Test Duration:</label>
          <select
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 text-sm sm:text-base text-[#8395a7]"
          >
            <option value={1}>1 minute</option>
            <option value={5}>5 minutes</option>
            <option value={10}>10 minutes</option>
            <option value={20}>20 minutes</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium text-[#222f3e]">Select Difficulty Level:</label>
          {difficulties.map((level) => (
            <div key={level} className="flex items-center">
              <input
                type="radio"
                id={level}
                value={level}
                checked={difficulty === level}
                onChange={() => setDifficulty(level)}
                className="mr-2"
              />
              <label htmlFor={level} className="text-[#8395a7] text-sm sm:text-base">{level}</label>
            </div>
          ))}
        </div>

       

        <button
          type="button"
          onClick={handleStartTest}
          className="bg-red-400 text-white rounded p-4 cursor-pointer w-full hover:scale-105 transform transition-transform duration-200"
        >
          Start Test
        </button>
      </form>
    </div>
  );
};

export default TypingTestForm;


