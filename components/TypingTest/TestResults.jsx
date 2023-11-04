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
    <div className="p-4 md:w-1/2 mx-auto my-12 w-11/12 shadow-md rounded-sm">
      <div className="text-center text-red-400 text-xl font-bold mb-4">
        English Typing Test Results
      </div>
      <div className="border-b border-[#757d85] mb-4"></div>
      <table className="w-full">
        <tbody>
          <tr>
            <td className="text-[#222f3e] p-2">Total Words Typed:</td>
            <td className="text-[#222f3e] p-2">{totalWords}</td>
          </tr>
          <tr>
            <td className="text-[#222f3e] p-2">Correct Words:</td>
            <td className="text-[#222f3e] p-2">{correctWordsCount}</td>
          </tr>
          <tr>
            <td className="text-[#222f3e] p-2">Accuracy:</td>
            <td className="text-[#222f3e] p-2">{accuracy}%</td>
          </tr>
          <tr>
            <td className="text-[#222f3e] p-2">Gross Speed:</td>
            <td className="text-[#222f3e] p-2">{grossSpeed} WPM</td>
          </tr>
          <tr>
            <td className="text-[#222f3e] p-2">Net Speed:</td>
            <td className="text-[#222f3e] p-2">{netSpeed} WPM</td>
          </tr>
        </tbody>
      </table>
      <div className="border-t border-[#757d85] mt-4"></div>
      <div className="mt-4 flex justify-center">
        <button
          className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-3 rounded"
          onClick={retakeTest}
        >
          Retake Test
        </button>
      </div>
    </div>
  );
};

export default TestResults;
