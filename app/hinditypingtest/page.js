"use client";

import React, { useState, useEffect, useCallback } from "react";
import TestSetupForm from "@/components/TypingTest/TestSetupH";
import HindiTypingSpace from "@/components/TypingTest/HindiTypingSpace2"; // Update import if necessary
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

    const difficulties = Object.keys(transformed);
    console.log("Available Difficulties:", difficulties); // Log the available difficulties
    setAvailableDifficulties(difficulties);
    return transformed;
  }, []);

  const fetchTexts = async () => {
    try {
      const response = await fetch("http://localhost:3000/hinditext");
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
      console.log(
        "Selected Difficulty in handleStartTest:",
        selectedDifficulty
      );
      console.log("Current Texts State:", texts);
      if (texts[selectedDifficulty] && texts[selectedDifficulty].length > 0) {
        const randomIndex = Math.floor(
          Math.random() * texts[selectedDifficulty].length
        );
        const randomText = texts[selectedDifficulty][randomIndex];
        setTestText(randomText);
        setDuration(selectedDuration);
        setUserName(selectedUserName);
        setEnableHighlight(highlight);
        setStartTest(true);
      } else {
        console.error(
          "No texts available for the selected difficulty:",
          selectedDifficulty
        );
        // You might want to handle this error more gracefully
      }
    },
    [texts]
  );

  const handleTestComplete = useCallback((testStats) => {
    setStats(testStats);
    setTimeOver(true);
    setStartTest(false);
  }, []);

  const retakeTest = () => {
    setTimeOver(false);
    setStats({});
  };

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
        <TestSetupForm
          onStartTest={handleStartTest}
          difficulties={availableDifficulties}
        />
      )}
    </>
  );
}
