"use client";
import React, { useState } from "react";
import TestRules1 from "./TestRules2";
import TestPage2 from "./TestPage2";
const TestSetupForm1 = ({ onStartTest }) => {
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
          Hindi Mangal Test Setup
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
              Select Categories:
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
                Science
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
                Literature
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
                Social
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

      <TestRules1
        title={"Online Hindi Mangal Typing Test"}
        text={`  We developed the Hindi Typing Test to help you gauge your typing speed and accuracy using our typing test software. The objective behind crafting this typing test was to provide you with an online platform where you can undergo a Hindi typing assessment and receive precise and unbiased feedback.   `}
      />
      <TestRules1
        title={
          "How to use Online Hindi Typing Test(Mangal Font in Ramington Gail Layout)?"
        }
        text={`Please start by entering your name in the designated box. After providing your name, proceed to the next step to manually select the duration of the Hindi Typing Test, with options available for up to 15 minutes. Following that, choose the difficulty level from the three options: easy, medium, or hard.

          Once you have configured the test settings, click the "Start" button. Upon clicking, a drop-down window will appear, offering various options, such as displaying your username on the top left, showcasing the remaining time at the top center, and more. In the center of the window, you will find different Hindi words for the typing test. Below these words are options to display real-time result statistics for your test.
          
          To initiate the test, click on the box where "Time will start once you start typing" is indicated. This action will prompt you to begin typing the highlighted words, allowing for an assessment of your typing proficiency in Hindi.
          `}
      />
      <TestPage2 />
    </>
  );
};

export default TestSetupForm1;
