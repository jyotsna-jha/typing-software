import React from "react";
import {
  FaKeyboard,
  FaLanguage,
  FaEdit,
  FaTranslate,
  FaTasks,
  FaDownload,
} from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="w-full max-w-screen-xl p-4 md:p-8 shadow-lg rounded-lg text-center text-[#e74c3c] custom-bg-color">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#e74c3c] mb-4 font-poppins">
          Typing Practice for All
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-[#2f3640] mb-8 font-poppins">
          Improve your typing skills, speed, and accuracy in multiple languages
          with our tests. Test your Hindi, English, or Unicode typing abilities.
          Explore translation services, MCQ tests, and valuable resources.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: <FaKeyboard size={30} />, text: "Hindi Typing Test" },
            { icon: <FaKeyboard size={30} />, text: "English Typing Test" },
            { icon: <FaKeyboard size={30} />, text: "Unicode Typing Test" },
            { icon: <FaLanguage size={30} />, text: "Translator" },
            { icon: <FaTasks size={30} />, text: "MCQ Tests" },
            { icon: <FaDownload size={30} />, text: "Downloads" },
          ].map((button, index) => (
            <div
              key={index}
              className="group relative transform transition-transform hover:scale-105"
            >
              <div className="bg-gray-200 p-6 rounded-lg text-center transition-transform transform  flex flex-col items-center hover:shadow-md">
                {button.icon}
                <p className="font-semibold text-base lg:text-lg text-[#2f3640] font-poppins">
                  {button.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
