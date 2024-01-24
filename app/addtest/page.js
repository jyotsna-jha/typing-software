"use client";

import React, { useState, useEffect } from "react";

import CreateQuestionSet from "../../components/McqTest/CreateQuestionSet";
import AddQuestion from "../../components/McqTest/AddQuestion";
import QuestionSetsList from "../../components/McqTest/QuestionSetsList";

const Page = () => {
  const [currentQuestionSetId, setCurrentQuestionSetId] = useState(null);
  const [showQuestionSets, setShowQuestionSets] = useState(false);
  const [showAddQuestions, setShowAddQuestions] = useState(false);

  const handleQuestionSetCreated = (questionSet) => {
    setCurrentQuestionSetId(questionSet.id);
    setShowAddQuestions(true);
    setShowQuestionSets(false);
  };

  const handleQuestionsAdded = (questions) => {
    console.log("Questions Added:", questions);
    setShowAddQuestions(false);
    setShowQuestionSets(true);
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch("http://localhost:3000/verify-auth", {
          credentials: "include",
        });
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Error verifying auth:", error);
        window.location.href = "/login";
      }
    };

    verifyAuth();
  }, []);

  if (!isLoggedIn) {
    return null; // Or a loading indicator
  }
  return (
    <div className="bg-white min-h-screen p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#e74c3c] mb-4 font-poppins">
        Create a New Question Set
      </h1>
      <CreateQuestionSet onQuestionSetCreated={handleQuestionSetCreated} />
      {showAddQuestions && currentQuestionSetId && (
        <div className="mt-4">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#2f3640] mb-2 font-poppins">
            Add Questions to Question Set
          </h2>
          <AddQuestion
            questionSetId={currentQuestionSetId}
            onQuestionsAdded={handleQuestionsAdded}
          />
        </div>
      )}
      <button
        onClick={() => setShowQuestionSets(!showQuestionSets)}
        className="mt-4 bg-[#e74c3c] text-white font-poppins py-2 px-4 rounded hover:bg-[#c0392b] transition-colors"
      >
        {showQuestionSets ? "Hide" : "Show"} Question Sets
      </button>
      {showQuestionSets && <QuestionSetsList />}
    </div>
  );
};

export default Page;
