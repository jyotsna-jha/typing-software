import React from "react";

const TestResults = ({
  totalWords,
  correctWordsCount,
  accuracy,
  grossSpeed,
  netSpeed,
  retakeTest,
}) => {
  return (
    <div className="border-[1px] rounded-sm shadow-md border-[#757d85] p-4 md:w-[70%] m-auto my-28 w-[90%] flex flex-col gap-6">
      <div className="flex flex-col">
        <div className="flex justify-center">English Typing Test Results</div>
      </div>
      <div className="mt-4">
        <p>Total Words Typed: {totalWords}</p>
        <p>Correct Words: {correctWordsCount}</p>
        <p>Accuracy: {accuracy}%</p>
        <p>Gross Speed: {grossSpeed} WPM</p>
        <p className="text-center text-xl font-bold">
          Net Speed: {netSpeed} WPM
        </p>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={retakeTest}
      >
        Retake Test
      </button>
    </div>
  );
};

export default TestResults;
