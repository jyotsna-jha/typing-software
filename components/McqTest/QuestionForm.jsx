"use client";
import React from "react";

const QuestionForm = ({ question, onChange, index }) => {
  const handleOptionChange = (e, optionIndex) => {
    const updatedOptions = [...question.options];
    updatedOptions[optionIndex] = e.target.value;
    onChange({ ...question, options: updatedOptions }, index);
  };

  const handleQuestionTextChange = (e) => {
    onChange({ ...question, questionText: e.target.value }, index);
  };

  const handleCorrectAnswerChange = (e) => {
    onChange(
      { ...question, correctAnswer: parseInt(e.target.value, 10) },
      index
    );
  };

  return (
    <div>
      <input
        type="text"
        value={question.questionText}
        onChange={handleQuestionTextChange}
        placeholder="Question text"
      />
      {question.options.map((option, idx) => (
        <input
          key={idx}
          type="text"
          value={option}
          onChange={(e) => handleOptionChange(e, idx)}
          placeholder={`Option ${idx + 1}`}
        />
      ))}
      <input
        type="number"
        value={question.correctAnswer}
        onChange={handleCorrectAnswerChange}
        placeholder="Correct answer index"
        min="0"
        max={question.options.length - 1}
      />
    </div>
  );
};

export default QuestionForm;
