import React from 'react';
import {
  FaKeyboard,
  FaLanguage,
  FaEdit,
  FaTranslate,
  FaTasks,
  FaDownload,
} from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-screen-xl p-4 md:p-8 bg-[#2c3e50] shadow-lg rounded-lg text-center text-[#dcdde1]">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#dcdde1] mb-4 font-poppins">
          Typing Practice for All
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-[#dcdde1] mb-8 font-poppins">
          Improve your typing skills, speed, and accuracy in multiple languages with our tests. Test your Hindi, English, or Unicode typing abilities. Explore translation services, MCQ tests, and valuable resources.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: <FaKeyboard size={30} />, text: 'Hindi Typing Test' },
            { icon: <FaKeyboard size={30} />, text: 'English Typing Test' },
            { icon: <FaKeyboard size={30} />, text: 'Unicode Typing Test' },
            { icon: <FaLanguage size={30} />, text: 'Translator' },
            { icon: <FaTasks size={30} />, text: 'MCQ Tests' },
            { icon: <FaDownload size={30} />, text: 'Downloads' },
          ].map((button, index) => (
            <div
              key={index}
              className="group relative transform transition-transform hover:scale-105 hover:shadow-md">
              <div className="bg-[#e74c3c] p-6 rounded-lg text-center transition-transform transform hover:scale-105 hover:bg-opacity-100">
                {button.icon}
                <p className="font-semibold text-base lg:text-lg text-[#dcdde1] font-poppins">
                  {button.text}
                </p>
              </div>
              <div className="hidden group-hover:block absolute top-0 left-0 w-full h-full bg-opacity-75 bg-white transition-opacity opacity-0 hover:opacity-100">
                <p className="h-full flex items-center justify-center text-sm md:text-base lg:text-lg text-[#2c3e50] font-poppins">
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
