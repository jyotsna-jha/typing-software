import React from "react";

const Question = ({ id, questionText, options, onAnswerSelected }) => {
  console.log(questionText);
  return (
    <div className="my-5 p-4 bg-white shadow-md rounded">
      <div className="text-lg font-semibold mb-4">{questionText}</div>
      <div>
        {options.map((option, index) => (
          <label key={option.id} className="block mb-2">
            <input
              type="radio"
              name={`question_${id}`}
              value={index}
              className="mr-2"
              onChange={(e) => onAnswerSelected(id, parseInt(e.target.value))}
            />
            {option.option_text}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Question;
