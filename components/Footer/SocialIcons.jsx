import React from "react";
import { FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaFacebook } from "react-icons/fa";

const SocialIcons = ({ Icons }) => {
  const iconSize = 32; // Adjust the size as needed

  const iconStyle = {
    fontSize: iconSize,
  };

  return (
    <div className="text-[#2d98da]"> {/* Use the same color as your footer */}
      <FaInstagram
        style={iconStyle}
        className="text-[#d62976] p-2 cursor-pointer inline-flex items-center rounded-full bg-gray-700 mx-1.5 hover:text-[#e74c3c] hover-bg-[#6ab04c] duration-300"
      />
       <FaYoutube
        style={iconStyle}
        className="text-[#e04949] p-2 cursor-pointer inline-flex items-center rounded-full bg-gray-700 mx-1.5 hover:text-[#e74c3c] hover-bg-[#6ab04c] duration-300"
      />
    
    </div>
  );
};

export default SocialIcons;
