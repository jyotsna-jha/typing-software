"use client";

import EnglishTypingSpace from "@/components/TypingTest/EnglishTypingSpace";
import React, { useState } from "react";

const page = () => {
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
  return (
    <div>
      <EnglishTypingSpace onTestComplete={handleTestComplete} />
    </div>
  );
};

export default page;
