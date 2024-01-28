"use client";

import React, { useState, useEffect } from "react";

export default function AddText() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [text, setText] = useState("");
  const [difficulty, setDifficulty] = useState("");

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
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
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
        alert("Text added successfully");
        setText("");
        setDifficulty("");
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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 space-y-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800">
          Add English Text
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category:
            </label>
            <input
              id="category"
              type="text"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="text"
              className="block text-sm font-medium text-gray-700"
            >
              Text:
            </label>
            <textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              rows="4"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Add Text
          </button>
        </form>
      </div>
    </div>
  );
}
