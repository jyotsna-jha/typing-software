"use client";

import React, { useState, useEffect } from "react";
import Quiz from "@/components/McqTest/Quiz";

const TestPage = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [touched, setTouched] = useState({ name: false, category: false });

  useEffect(() => {
    fetch("http://localhost:3000/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories", error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTouched({ name: true, category: true });
    if (name.trim() !== "" && selectedCategory !== "") {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="front-page min-h-screen flex justify-center items-center bg-gray-100">
      {isSubmitted ? (
        <Quiz selectedCategory={selectedCategory} userName={name} />
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Quiz Portal
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Test your knowledge! Enter your details and select a category to
            begin.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="text-gray-700 font-medium">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched({ ...touched, name: true })}
                className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  touched.name && !name ? "border-red-500" : "border-gray-300"
                } sm:text-sm`}
              />
              {touched.name && !name && (
                <p className="text-red-500 text-xs italic mt-2">
                  Please enter your name.
                </p>
              )}
            </div>
            <div>
              <label htmlFor="category" className="text-gray-700 font-medium">
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                onBlur={() => setTouched({ ...touched, category: true })}
                className={`mt-1 block w-full pl-3 pr-10 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  touched.category && !selectedCategory
                    ? "border-red-500"
                    : "border-gray-300"
                } sm:text-sm`}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {touched.category && !selectedCategory && (
                <p className="text-red-500 text-xs italic mt-2">
                  Please select a category.
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Start Quiz
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TestPage;
