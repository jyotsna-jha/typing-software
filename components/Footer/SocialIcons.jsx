import React from "react";
import { FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaFacebook } from "react-icons/fa";

const SocialIcons = ({ Icons }) => {
  const iconSize = 32; // Adjust the size as needed

  const iconStyle = {
    fontSize: iconSize,
  };

  return (
    <div className="text-[#2d98da]"> {/* Use the same color as your footer */}
      <a href="https://www.instagram.com/anand.institute?igsh=MW9kYnZhaXJmNTEyeg%3D%3D" target="_blank" rel="noopener noreferrer">
        <FaInstagram
          style={iconStyle}
          className="text-[#d62976] p-2 cursor-pointer inline-flex items-center rounded-full bg-gray-700 mx-1.5 hover:text-[#e74c3c] hover-bg-[#6ab04c] duration-300"
        />
      </a>
      <a href="https://www.youtube.com/@AnandCompetitiveComputerClass" target="_blank" rel="noopener noreferrer">
        <FaYoutube
          style={iconStyle}
          className="text-[#e04949] p-2 cursor-pointer inline-flex items-center rounded-full bg-gray-700 mx-1.5 hover:text-[#e74c3c] hover-bg-[#6ab04c] duration-300"
        />
      </a>
    </div>
  );
};

export default SocialIcons;
