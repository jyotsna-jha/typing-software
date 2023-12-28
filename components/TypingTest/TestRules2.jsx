import React from "react";

const TestRules1 = ({ title, text }) => {
  return (
    <div className="w-full sm:w-4/5 lg:w-3/4 mx-auto p-4">
      <div className="border border-gray-300 rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#222f3e]">
          {title}
        </h2>
        <p className="border-t pt-2 text-justify text-[#222f3e]">{text}</p>
      </div>
    </div>
  );
};

export default TestRules1;
