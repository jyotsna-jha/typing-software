"use client";

import React, { useState, useEffect, useCallback } from "react";
import TestSetupForm from "@/components/TypingTest/TestSetup";
import EnglishTypingSpace from "@/components/TypingTest/EnglishTypingSpace";
import TestResults from "@/components/TypingTest/TestResults";

export default function TypingTest() {
  const [texts, setTexts] = useState({ easy: [], medium: [], hard: [] });
  const [startTest, setStartTest] = useState(false);
  const [timeOver, setTimeOver] = useState(false);
  const [stats, setStats] = useState({});
  const [testText, setTestText] = useState("");
  const [duration, setDuration] = useState(60);
  const [userName, setUserName] = useState("");
  const [enableHighlight, setEnableHighlight] = useState(true);

  useEffect(() => {
    fetchTexts();
  }, []);

  const transformTexts = (fetchedTexts) => {
    return fetchedTexts.reduce((acc, item) => {
      acc[item.difficulty] = acc[item.difficulty] || [];
      acc[item.difficulty].push(item.text);
      return acc;
    }, {});
  };

  const fetchTexts = async () => {
    try {
      const response = await fetch("http://localhost:3000/englishtext");
      if (response.ok) {
        const fetchedTexts = await response.json();
        setTexts(transformTexts(fetchedTexts));
      } else {
        throw new Error("Server responded with an error.");
      }
    } catch (error) {
      console.error("Error fetching texts:", error.message);
    }
  };

  const handleStartTest = useCallback(
    (duration, difficulty, userName, enableHighlight) => {
      const selectedTexts = texts[difficulty];
      if (selectedTexts && selectedTexts.length > 0) {
        const randomIndex = Math.floor(Math.random() * selectedTexts.length);
        setTestText(selectedTexts[randomIndex]);
        setDuration(duration);
        setUserName(userName);
        setEnableHighlight(enableHighlight);
        setStartTest(true);
      } else {
        console.error(
          "Selected texts are not available for difficulty:",
          difficulty
        );
      }
    },
    [texts]
  );

  const handleTestComplete = useCallback(
    (
      totalWords,
      correctWordsCount,
      wrongWordsCount,
      accuracy,
      grossSpeed,
      netSpeed,
      correctWords,
      wrongWords,
      backspaceCount
    ) => {
      setStats({
        totalWords,
        correctWordsCount,
        wrongWordsCount,
        accuracy,
        grossSpeed,
        netSpeed,
        correctWords,
        wrongWords,
        backspaceCount,
        testText,
      });
      setTimeOver(true);
      setStartTest(false);
    },
    [testText]
  );

  const retakeTest = useCallback(() => {
    setTimeOver(false);
    setStats({});
  }, []);

  if (startTest) {
    return (
      <EnglishTypingSpace
        sampleText={testText}
        timeLimit={duration}
        userName={userName}
        onTestComplete={handleTestComplete}
        enableHighlight={enableHighlight}
      />
    );
  }

  return (
    <>
      {timeOver ? (
        <TestResults {...stats} retakeTest={retakeTest} />
      ) : (
        <TestSetupForm onStartTest={handleStartTest} />
      )}
    </>
  );
}
