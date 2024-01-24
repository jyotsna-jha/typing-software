import React, { useState } from "react";
import TestRules from "./TestRules";
import TestPage from "./TestPage";

const TestSetupForm = ({ onStartTest }) => {
  const [userName, setUserName] = useState("");
  const [duration, setDuration] = useState(60); // Default duration to 60 seconds
  const [difficulty, setDifficulty] = useState("easy");
  const [enableHighlight, setEnableHighlight] = useState(true);
  const handleStartTest = (e) => {
    e.preventDefault();
    onStartTest(duration, difficulty, userName, enableHighlight); // Use the callback to pass the values to the parent component
  };

  return (
    <>
      <div className="p-4 max-w-md mx-auto bg-gray-200 rounded-lg mb-10 font-poppins mt-10">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center text-[#222f3e]">
          English Test Setup
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
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium text-[#222f3e]">
              Select Difficulty Level:
            </label>
            <div className="flex flex-col">
              <label
                htmlFor="easy"
                className="text-[#8395a7] text-sm sm:text-base"
              >
                <input
                  type="radio"
                  id="easy"
                  name="difficulty"
                  value="easy"
                  checked={difficulty === "easy"}
                  onChange={() => setDifficulty("easy")}
                  className="mr-2"
                />
                Easy
              </label>
              <label
                htmlFor="medium"
                className="text-[#8395a7] text-sm sm:text-base"
              >
                <input
                  type="radio"
                  id="medium"
                  name="difficulty"
                  value="medium"
                  checked={difficulty === "medium"}
                  onChange={() => setDifficulty("medium")}
                  className="mr-2"
                />
                Medium
              </label>
              <label
                htmlFor="hard"
                className="text-[#8395a7] text-sm sm:text-base"
              >
                <input
                  type="radio"
                  id="hard"
                  name="difficulty"
                  value="hard"
                  checked={difficulty === "hard"}
                  onChange={() => setDifficulty("hard")}
                  className="mr-2"
                />
                Hard
              </label>
            </div>
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
      <TestRules
        title={"Online English Typing Test"}
        text={
          "Experience a fast and highly precise typing speed evaluation tool tailored for the English language. Our test is meticulously designed to provide exceptional user satisfaction and top-notch performance."
        }
      />
      <TestRules
        title={"How Does English Typing Test Work?"}
        text={
          "Please note that the test is case-sensitive. Within the designated time frame in the Typing Window Typing Tool, aim to type as many words as possible. The tool will calculate your typing speed in both GWPM (Gross Words Per Minute) and NWPM (Net Words Per Minute). This English Typing Assessment will provide insights into your typing speed [WPM], accuracy, the total number of words typed, and the number of correct words. The timer initiates as soon as you commence typing, and once the allotted time elapses, your overall performance summary will be available for self-evaluation."
        }
      />
      <TestPage />
    </>
  );
};

export default TestSetupForm;
