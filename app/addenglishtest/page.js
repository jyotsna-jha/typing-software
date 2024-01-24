"use client";

import React, { useState, useEffect } from "react";

export default function AddText() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [text, setText] = useState("");
  const [difficulty, setDifficulty] = useState("easy");

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
    return <p>Loading...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/admin/englishtext", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, difficulty }),
        credentials: "include",
      });

      if (response.ok) {
        // Handle success
        alert("Text added successfully");
      } else {
        console.log(await response.text());
        alert("Failed to add text");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form");
    }
  };

  return (
    <div>
      <h1>Add English Text</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="difficulty">Difficulty:</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div>
          <label htmlFor="text">Text:</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button type="submit">Add Text</button>
      </form>
    </div>
  );
}
