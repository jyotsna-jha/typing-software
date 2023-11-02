"use client";
import React, { useState } from "react";
import EnglishTypingSpace from "@/components/TypingTest/EnglishTypingSpace";
import TestResults from "@/components/TypingTest/TestResults";

export default function TypingTest() {
  const [timeOver, setTimeOver] = useState(false);
  const [stats, setStats] = useState({});

  const handleTestComplete = (
    totalWords,
    correctWordsCount,
    accuracy,
    grossSpeed,
    netSpeed
  ) => {
    setStats({ totalWords, correctWordsCount, accuracy, grossSpeed, netSpeed });
    setTimeOver(true);
  };

  const retakeTest = () => {
    setTimeOver(false);
    setStats({});
  };

  return (
    <>
      {timeOver ? (
        <TestResults {...stats} retakeTest={retakeTest} />
      ) : (
        <EnglishTypingSpace onTestComplete={handleTestComplete} />
      )}
    </>
  );
}
