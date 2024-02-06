"use client"
import React from "react";
import {
  FaKeyboard,
  FaLanguage,
  FaTasks,
  FaDownload,
} from "react-icons/fa";

const HomePage = () => {
  const buttons = [
    { icon: <FaKeyboard size={30} />, text: "Hindi Typing Test", link: "./hinditypingtest" },
    { icon: <FaKeyboard size={30} />, text: "English Typing Test", link: "/englishtypingtest" },
    { icon: <FaKeyboard size={30} />, text: "Hindi Mangal Typing Test", link: "/mangaltypingtest" },
    { icon: <FaLanguage size={30} />, text: "Translator", link: "./translations" },
    { icon: <FaTasks size={30} />, text: "MCQ Tests", link: "./mcqtest" },
    { icon: <FaDownload size={30} />, text: "Downloads", link: "./downloads" },
  ];

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="w-full max-w-screen-xl p-4 md:p-8 shadow-lg rounded-lg text-center text-red-500 custom-bg-color">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-red-500 mb-4 font-poppins">
          Typing Practice for All
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-gray-800 mb-8 font-poppins">
          Improve your typing skills, speed, and accuracy in multiple languages
          with our tests. Test your Hindi, English, or Unicode typing abilities.
          Explore translation services, MCQ tests, and valuable resources.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {buttons.map((button, index) => (
            <a key={index} href={button.link} className="group relative transform transition-transform hover:scale-105">
              <div className="bg-gray-200 p-6 rounded-lg text-center transition-transform transform flex flex-col items-center hover:shadow-md">
                {button.icon}
                <p className="font-semibold text-lg text-gray-800 font-poppins">
                  {button.text}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
