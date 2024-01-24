"use client";
import React, { useState } from "react";

const AddQuestion = ({ questionSetId, onQuestionsAdded }) => {
  const [questions, setQuestions] = useState([
    { questionText: "", options: [{ text: "", isCorrect: false }] },
  ]);

  // Function to check if a question has exactly one correct answer
  const isQuestionValid = (question) => {
    const correctOptions = question.options.filter((opt) => opt.isCorrect);
    return correctOptions.length === 1;
  };

  // Function to check if all questions are valid before adding a new one
  const canAddNewQuestion = () => {
    return questions.every(isQuestionValid);
  };

  const handleAddOption = (questionIndex) => {
    const newQuestions = questions.map((question, index) => {
      if (index === questionIndex) {
        return {
          ...question,
          options: [...question.options, { text: "", isCorrect: false }],
        };
      }
      return question;
    });
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (questionIndex, text) => {
    const newQuestions = questions.map((question, index) => {
      if (index === questionIndex) {
        return { ...question, questionText: text };
      }
      return question;
    });
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, text, isCorrect) => {
    const newQuestions = questions.map((question, qIndex) => {
      if (qIndex === questionIndex) {
        const newOptions = question.options.map((option, oIndex) => {
          if (oIndex === optionIndex) {
            return { ...option, text, isCorrect };
          } else {
            // Ensure only one option is marked as correct
            return isCorrect ? { ...option, isCorrect: false } : option;
          }
        });
        return { ...question, options: newOptions };
      }
      return question;
    });
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    if (canAddNewQuestion()) {
      setQuestions([
        ...questions,
        { questionText: "", options: [{ text: "", isCorrect: false }] },
      ]);
    } else {
      alert("Please make sure each question has exactly one correct answer.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canAddNewQuestion()) {
      alert("Please make sure each question has exactly one correct answer.");
      return;
    }
    try {
      // Adjust the endpoint as per your backend API
      const response = await fetch(
        `http://localhost:3000/question-sets/${questionSetId}/questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ questions }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      onQuestionsAdded(data);
      setQuestions([
        { questionText: "", options: [{ text: "", isCorrect: false }] },
      ]);
    } catch (error) {
      console.error("Error adding questions", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-4 bg-white rounded shadow-lg max-w-2xl mx-auto"
    >
      {questions.map((question, qIndex) => (
        <div key={qIndex} className="space-y-4">
          <input
            type="text"
            value={question.questionText}
            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
            placeholder="Question Text"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          {question.options.map((option, oIndex) => (
            <div key={oIndex} className="flex items-center space-x-3">
              <input
                type="text"
                value={option.text}
                onChange={(e) =>
                  handleOptionChange(
                    qIndex,
                    oIndex,
                    e.target.value,
                    option.isCorrect
                  )
                }
                placeholder={`Option ${oIndex + 1}`}
                className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              />
              <input
                type="checkbox"
                checked={option.isCorrect}
                onChange={(e) =>
                  handleOptionChange(
                    qIndex,
                    oIndex,
                    option.text,
                    e.target.checked
                  )
                }
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span>{option.isCorrect ? " (Correct)" : ""}</span>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddOption(qIndex)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Option
          </button>
        </div>
      ))}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleAddQuestion}
          disabled={!canAddNewQuestion()}
          className={`px-3 py-1 ${
            canAddNewQuestion()
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-500"
          } text-white rounded`}
        >
          Add Another Question
        </button>
        <button
          type="submit"
          className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          Submit Questions
        </button>
      </div>
    </form>
  );
};

export default AddQuestion;
