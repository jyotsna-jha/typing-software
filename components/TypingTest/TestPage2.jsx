import React from "react";

const TestPage2 = () => {
  return (
    <div className="w-full sm:w-4/5 lg:w-3/4 mx-auto p-4">
      <div
        className="border border-gray-300 rounded-lg p-4"
        style={{ backgroundColor: "#ffffff", color: "#222f3e" }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-[#222f3e]">
          Typing Speed Calculation
        </h2>
        <p className="border-t pt-2 text-justify text-[#222f3e]">
          These formulas are widely recognized as the standard methods for
          precisely calculating typing speed.
        </p>

        <h3 className="text-xl font-bold my-4 text-[#222f3e]">
          GWPM (Gross Word Per Minute)
        </h3>
        <p className="text-[#222f3e]">
          Throughout the test, keep track of the total number of words you type.
          Once the test is completed, note the amount of time it took to finish
          in minutes. To determine your Gross Speed, divide the total number of
          words by the time taken in minutes. This Gross Speed is presented as
          the number of words you can type in a minute, without factoring in any
          errors or mistakes made during the test. It provides a clear measure
          of your typing speed.
        </p>
        <img
          src="/assets/grossSpeed.png"
          alt="GWPM Formula"
          className="mx-auto my-4"
          style={{ maxWidth: "100%", height: "auto" }}
        />

        <h3 className="text-xl font-bold my-4 text-[#222f3e]">
          Net Speed (WPM)
        </h3>
        <p className="text-[#222f3e]">
          Similarly, to calculate Error Rates, use the following formula:
          subtract the count of correct words from the total number of words
          typed during the test and then divide the result by the time taken in
          minutes. Net Speed can be determined by subtracting the errors made
          per minute from the Gross Speed.
        </p>
        <img
          src="/assets/net_speed.png"
          alt="Net Speed Formula"
          className="mx-auto my-4"
          style={{ maxWidth: "60%", height: "auto" }}
        />

        <h3 className="text-xl font-bold my-4 text-[#222f3e]">Accuracy (%)</h3>
        <p className="text-[#222f3e]">
          Accuracy is calculated as a percentage using the following formula:
          divide the count of correct words by the total number of words and
          then multiply the result by 100. This formula provides the accuracy
          rate, representing the proportion of correctly typed words to the
          total words typed, expressed as a percentage.
        </p>

        <img
          src="/assets/accuracy.png"
          alt="Accuracy Formula"
          className="mx-auto my-4"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default TestPage2;
