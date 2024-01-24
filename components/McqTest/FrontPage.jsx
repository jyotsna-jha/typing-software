import React, { useState, useEffect } from "react";

const FrontPage = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories", error));
    console.log(categories);
    // }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.error(" navigating to quiz");
    } catch (error) {
      console.error("Error navigating to quiz", error);
    }
  };

  return (
    <div className="front-page">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit">Start Quiz</button>
      </form>
    </div>
  );
};

export default FrontPage;
