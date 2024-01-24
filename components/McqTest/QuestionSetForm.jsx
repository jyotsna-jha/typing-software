"use client";

import React, { useState } from "react";
import QuestionForm from "./QuestionForm";

const initialQuestion = {
  questionText: "",
  options: ["", "", "", ""],
  correctAnswer: 0,
};

const QuestionSetForm = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [questions, setQuestions] = useState([initialQuestion]);

  const handleQuestionChange = (updatedQuestion, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = updatedQuestion;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    const lastQuestion = questions[questions.length - 1];
    if (
      lastQuestion.questionText.trim() &&
      lastQuestion.options.every((option) => option.trim())
    ) {
      setQuestions([...questions, initialQuestion]);
    } else {
      alert("Please complete the last question before adding a new one.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !category.trim()) {
      alert("Please fill in the title and category.");
      return;
    }

    for (const question of questions) {
      if (
        !question.questionText.trim() ||
        !question.options.every((option) => option.trim())
      ) {
        alert("Please complete all questions and options.");
        return;
      }
    }

    const formattedQuestions = questions.map((q) => ({
      question_text: q.questionText,
      options: q.options,
      correct_answer: q.correctAnswer,
    }));

    try {
      const response = await fetch("http://localhost:5001/api/questionSets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category_id: category,
          questions: formattedQuestions,
        }),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const result = await response.json();
      console.log("Question set added:", result);
      // Reset form or show success message
    } catch (error) {
      console.error("Error adding question set:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full mb-4 px-3 py-2 border border-gray-300 rounded shadow-sm"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        className="w-full mb-4 px-3 py-2 border border-gray-300 rounded shadow-sm"
      />
      {questions.map((question, index) => (
        <QuestionForm
          key={index}
          question={question}
          onChange={handleQuestionChange}
          index={index}
        />
      ))}
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={addQuestion}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Question
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Submit Question Set
        </button>
      </div>
    </form>
  );
};

export default QuestionSetForm;
