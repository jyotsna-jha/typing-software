import React from "react";
import ItemsContainer from "./ItemsContainer";
import SocialIcons from "./SocialIcons";
import { Icons } from "./Menu";

const Footer = () => {
  return (
    <footer className="bg-[#2980b9] text-white">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#e74c3c] py-7">
        <h1
          className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5"
        >
          <span className="text-[#6ab04c]">Type </span>like a pro, at your own pace
        </h1>
        <div>
          <input
            type="text"
            placeholder="Enter Your Email"
            className="text-[#2d98da] sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
          />
          <button
            className="bg-[#6ab04c] hover:bg-[#e74c3c] duration-300 px-5 py-2.5 font-[Poppins] rounded-md text-white md:w-auto w-full"
          >
            Reach Us
          </button>
        </div>
      </div>
      <ItemsContainer />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-[#dcdde1] text-sm pb-8">
        <span>© 2023 Anand Typing. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <SocialIcons Icons={Icons} />
      </div>
    </footer>
  );
};

export default Footer;
