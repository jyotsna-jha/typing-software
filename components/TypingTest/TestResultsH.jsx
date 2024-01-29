"use client";
import React from "react";
const TestResults1 = ({
  totalWords,
  correctWordsCount,
  accuracy,
  grossSpeed,
  netSpeed,
  retakeTest,
  correctWords,
  wrongWords,
  wrongWordsCount,
  backspaceCount,
}) => {
  console.log("Wrong Words:", wrongWords);
  return (
    <div className="p-4 md:w-1/2 mx-auto my-12 w-11/12 shadow-md rounded-sm">
      <div className="text-center text-red-400 text-3xl font-bold mb-4">
        Hindi Krutidev Test Results
      </div>
      <div className="border-b border-[#757d85] mb-4"></div>
      <table className="w-full">
        <tbody>
          <tr>
            <td className="text-[#222f3e] p-2 text-xl">Total Words Typed:</td>
            <td className="text-[#222f3e] p-2 text-xl">{totalWords}</td>
          </tr>
          <tr>
            <td className="text-[#222f3e] p-2 text-xl">Correct Words:</td>
            <td className="text-[#222f3e] p-2 text-xl">{correctWordsCount}</td>
          </tr>
          <tr>
            <td className="text-[#222f3e] p-2 text-xl">Wrong Words:</td>
            <td className="text-[#222f3e] p-2 text-xl">{wrongWordsCount}</td>
          </tr>
          <tr>
            <td className="text-[#222f3e] p-2 text-xl">
              Number of backspace pressed
            </td>
            <td className="text-[#222f3e] p-2 text-xl">{backspaceCount}</td>
          </tr>
          <tr>
            <td className="text-[#222f3e] p-2 text-xl">Accuracy:</td>
            <td className="text-[#222f3e] p-2 text-xl">{accuracy}%</td>
          </tr>

          <tr>
            <td className="text-[#222f3e] p-2 text-xl">Gross Speed:</td>
            <td className="text-[#222f3e] p-2 text-xl">{grossSpeed} WPM</td>
          </tr>

          <tr>
            <td className="text-[#222f3e] p-2 text-xl">Net Speed:</td>
            <td className="text-[#222f3e] p-2 text-xl">{netSpeed} WPM</td>
          </tr>
        </tbody>
      </table>
      <div className="border-t border-[#757d85] mt-4"></div>
      <div className="mt-4">
        <h1 className="text-xl font-bold text-[#222f3e] mb-2">
          Correct Words:
        </h1>
        <div className="overflow-auto max-h-48 mb-4">
          <table className="w-full">
            {correctWords &&
              correctWords.map((word, index) => (
                <tr key={index}>
                  <td
                    className="border px-4 py-2"
                    style={{
                      fontFamily: "hindi",
                      fontSize: "29px",
                    }}
                  >
                    {word}
                  </td>
                </tr>
              ))}
          </table>
        </div>

        <h2 className="text-xl font-bold text-[#222f3e] mb-2">
          Wrong Words with their Correct Counterparts:
        </h2>
        <div className="overflow-auto max-h-48">
          <table className="w-full">
            {wrongWords.map((wordPair, index) => (
              <tr key={index}>
                <td
                  className="border px-4 py-2 text-red-500"
                  style={{ fontFamily: "hindi", fontSize: "29px" }}
                >
                  {wordPair.typed}
                </td>
                <td
                  className="border px-4 py-2 text-green-500"
                  style={{ fontFamily: "hindi", fontSize: "29px" }}
                >
                  {wordPair.correct}
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
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

export default TestResults1;
