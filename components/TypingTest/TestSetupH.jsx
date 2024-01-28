"use client";
import React, { useState } from "react";

const TestSetupForm1 = ({ onStartTest, difficulties }) => {
  const [userName, setUserName] = useState("");
  const [duration, setDuration] = useState(60); // Default duration to 60 seconds
  const [difficulty, setDifficulty] = useState(difficulties?.[0] || "easy");
  const [enableHighlight, setEnableHighlight] = useState(true);

  const handleStartTest = (e) => {
    e.preventDefault();
    onStartTest(duration, difficulty, userName, enableHighlight);
  };

  return (
    <>
      <div className="p-4 max-w-md mx-auto bg-gray-200 rounded-lg mb-10 font-poppins mt-10">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center text-[#222f3e]">
          Krutidev Test Setup
        </h2>
        <form onSubmit={handleStartTest}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block font-medium text-[#222f3e]"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 text-sm sm:text-base"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="duration"
              className="block font-medium text-[#222f3e]"
            >
              Select Test Duration:
            </label>
            <select
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 text-sm sm:text-base text-[#8395a7]"
              required
            >
              <option value="30">30 seconds</option>
              <option value="60">1 minute</option>
              <option value="180">3 minutes</option>
              <option value="900">15 minutes</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium text-[#222f3e]">
              Select Category:
            </label>
            {difficulties?.map((diff) => (
              <label
                key={diff}
                htmlFor={diff}
                className="text-[#8395a7] text-sm sm:text-base"
              >
                <input
                  type="radio"
                  id={diff}
                  name="difficulty"
                  value={diff}
                  checked={difficulty === diff}
                  onChange={() => setDifficulty(diff)}
                  className="mr-2"
                />
                {diff.charAt(0).toUpperCase() + diff.slice(1)}
              </label>
            ))}
          </div>

          <div className="mb-4">
            <label
              htmlFor="enableHighlight"
              className="font-medium text-[#222f3e] flex items-center"
            >
              <input
                type="checkbox"
                id="enableHighlight"
                checked={enableHighlight}
                onChange={(e) => setEnableHighlight(e.target.checked)}
                className="mr-2"
              />
              Enable Highlight
            </label>
          </div>

          <button
            type="submit"
            className="bg-red-400 text-white rounded p-4 cursor-pointer w-full hover:scale-105 transform transition-transform duration-200"
          >
            Start Test
          </button>
        </form>
      </div>
    </>
  );
};

export default TestSetupForm1;
