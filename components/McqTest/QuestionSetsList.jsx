"use client";

import React, { useState, useEffect } from "react";

const QuestionSetsList = () => {
  const [questionSets, setQuestionSets] = useState([]);

  useEffect(() => {
    const fetchQuestionSets = async () => {
      try {
        const response = await fetch("http://localhost:3000/question-sets");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setQuestionSets(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchQuestionSets();
  }, []);

  const handleDeleteQuestionSet = async (setId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/question-sets/${setId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (response.ok) {
        setQuestionSets(questionSets.filter((set) => set.id !== setId));
      }
    } catch (error) {
      console.error("Error deleting question set", error);
    }
  };

  const handleDeleteQuestion = async (setId, questionId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/question-sets/${setId}/questions/${questionId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setQuestionSets(
          questionSets.map((set) => {
            if (set.id === setId) {
              return {
                ...set,
                questions: set.questions.filter((q) => q.id !== questionId),
              };
            }
            return set;
          })
        );
      }
    } catch (error) {
      console.error("Error deleting question", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Question Sets</h2>
      {questionSets.map((set) => (
        <div key={set.id} className="mb-4 p-4 bg-gray-100 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2 flex justify-between items-center">
            <span>
              {set.title} - Category: {set.category}
            </span>
            <button
              onClick={() => handleDeleteQuestionSet(set.id)}
              className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition-colors text-sm"
            >
              Delete Set
            </button>
          </h3>
          <ul className="list-disc pl-5">
            {set.questions &&
              set.questions.map((question) => (
                <li key={question.id} className="mb-2">
                  <div className="flex justify-between items-center">
                    <span>{question.question_text}</span>
                    <button
                      onClick={() => handleDeleteQuestion(set.id, question.id)}
                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition-colors text-sm"
                    >
                      Delete Question
                    </button>
                  </div>
                  <ul className="list-circle pl-6 mt-1">
                    {question.options &&
                      question.options.map((option) => (
                        <li
                          key={option.id}
                          className={option.is_correct ? "font-bold" : ""}
                        >
                          {option.option_text}{" "}
                          {option.is_correct ? "(Correct Answer)" : ""}
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default QuestionSetsList;
