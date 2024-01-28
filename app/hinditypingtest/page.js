"use client";
import React, { useState, useEffect, useCallback } from "react";
import TestSetupForm1 from "@/components/TypingTest/TestSetupH";
import HindiTypingSpace from "@/components/TypingTest/HindiTypingSpace2";
import TestResults from "@/components/TypingTest/TestResultsH";

export default function TypingTest() {
  const [texts, setTexts] = useState({});
  const [availableDifficulties, setAvailableDifficulties] = useState([]);
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

  const transformTexts = useCallback((fetchedTexts) => {
    const transformed = fetchedTexts.reduce((acc, item) => {
      if (!acc[item.difficulty]) {
        acc[item.difficulty] = [];
      }
      acc[item.difficulty].push(item.text);
      return acc;
    }, {});
    setAvailableDifficulties(Object.keys(transformed));
    return transformed;
  }, []);

  const fetchTexts = async () => {
    try {
      const response = await fetch("http://localhost:3000/hinditext"); // Replace with your actual API endpoint
      if (response.ok) {
        const data = await response.json();
        setTexts(transformTexts(data));
      } else {
        throw new Error("Error fetching texts.");
      }
    } catch (error) {
      console.error("Error fetching texts:", error);
    }
  };

  const handleStartTest = useCallback(
    (selectedDuration, selectedDifficulty, selectedUserName, highlight) => {
      const randomText =
        texts[selectedDifficulty][
          Math.floor(Math.random() * texts[selectedDifficulty].length)
        ];
      setTestText(randomText);
      setDuration(selectedDuration);
      setUserName(selectedUserName);
      setEnableHighlight(highlight);
      setStartTest(true);
    },
    [texts]
  );

  const handleTestComplete = useCallback((testStats) => {
    setStats(testStats);
    setTimeOver(true);
    setStartTest(false);
  }, []);

  const retakeTest = useCallback(() => {
    setTimeOver(false);
    setStats({});
  }, []);

  if (startTest) {
    return (
      <HindiTypingSpace
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
        <TestSetupForm1
          onStartTest={handleStartTest}
          difficulties={availableDifficulties}
        />
      )}
    </>
  );
}
