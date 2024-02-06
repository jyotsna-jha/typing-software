// Import useState and useEffect from React
"use client"
import { useState, useEffect } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState("");
  const [isSticky, setIsSticky] = useState(false);

  // Function to handle scrolling and update the isSticky state
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  // Add an event listener for scroll when the component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`${
        isSticky ? "fixed top-0 left-0 right-0 bg-gray-900 z-50" : ""
      } md:bg-gray-900 p-4 md:text-white md:border-0 text-md font-[Poppins] bg-white text-gray-900`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-xl font-bold">
          <img src="/assets/logo.png" alt="Logo" className="h-20 w-auto" />
        </a>
        <div className="hidden md:flex md:gap-8">
          <a href="/" className="hover:text-[#e74c3c] py-4">
            Home
          </a>
          <div
            className="relative inline-block z-50 "
            onMouseEnter={() => setActiveDropdown("typing")}
            onMouseLeave={() => setActiveDropdown("")}
          >
            <a href="#" className="flex items-center hover:text-[#e74c3c] py-4">
              Typing Test{" "}
              <span className="text-[10px] ml-2">
                {activeDropdown == "typing" ? "▲" : "▼"}
              </span>
            </a>
            <div
              className={`absolute left-0 mt-0 w-48 bg-white text-gray-900 p-2 rounded shadow-lg ${
                activeDropdown === "typing" ? "block" : "hidden"
              }`}
            >
              <a
                href="/hinditypingtest"
                className="block  py-1  hover:text-[#e74c3c]"
              >
                <span className="text-xs mr-2 bold">→</span>
                Hindi Typing Test
              </a>
              <a
                href="/englishtypingtest"
                className="block  py-1  hover:text-[#e74c3c]"
              >
                <span className="text-xs mr-2 bold">→</span>
                English Typing Test
              </a>
              <a
                href="/mangaltypingtest"
                className="block py-1 hover:text-[#e74c3c]"
              >
                <span className="text-xs mr-2 bold">→</span>
                Mangal Typing Test
              </a>
            </div>
          </div>
          <a href="/translations" className="hover:text-[#e74c3c] py-4">
            Translator
          </a>
          <a href="/mcqtest" className="hover:text-[#e74c3c] py-4">
            Test
          </a>
          <a href="/downloads" className="hover:text-[#e74c3c] py-4">
            Downloads
          </a>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[2.5rem] text-[#e74c3c]"
          >
            {isOpen ? "×" : "☰"}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden w-full absolute left-0 top-[112px] bg-gray-900 text-white py-4">
          <a href="#" className="block py-2 px-4">
            Home
          </a>
          <div className="relative group">
            <button
              onClick={() =>
                setActiveDropdown(activeDropdown === "typing" ? "" : "typing")
              }
              className="w-full text-left py-2 px-4 flex justify-between items-center"
            >
              Typing{" "}
              <span className="text-[10px] ml-2">
                {activeDropdown == "typing" ? "▲" : "▼"}
              </span>
            </button>
            {activeDropdown === "typing" && (
              <div className="py-2 px-4 bg-white text-gray-900">
                <a
                  href="/hinditypingtest"
                  className="block py-1 hover:text-[#e74c3c]"
                >
                  <span className="text-xs mr-2 bold">→</span>
                  Hindi Typing Test
                </a>
                <a
                  href="/englishtypingtest"
                  className="block py-1 hover:text-[#e74c3c]"
                >
                  <span className="text-xs mr-2 bold">→</span>
                  English Typing Test
                </a>
                <a
                  href="/mangaltypingtest"
                  className="block py-1 hover:text-[#e74c3c]"
                >
                  <span className="text-xs mr-2 bold">→</span>
                  Mangal Typing Test
                </a>
              </div>
            )}
          </div>
          {/* <div className="relative group">
            <button
              onClick={() =>
                setActiveDropdown(
                  activeDropdown === "translator" ? "" : "translator"
                )
              }
              className="w-full text-left py-2 px-4 flex justify-between items-center"
            >
              Translator{" "}
              <span className="text-[10px] ml-2">
                {activeDropdown == "translator" ? "▲" : "▼"}
              </span>
            </button>
            {activeDropdown === "translator" && (
              <div className="py-2 px-4 bg-white text-gray-900">
                <a href="#" className="block py-1 hover:text-[#e74c3c]">
                  <span className="text-xs mr-2 bold">→</span>
                  Hindi to English
                </a>
                <a href="#" className="block py-1 hover:text-[#e74c3c]">
                  <span className="text-xs mr-2 bold">→</span>
                  English to Hindi
                </a>
              </div>
            )}
          </div> */}
          <a href="/translations" className="block py-2 px-4">
            Translator
          </a>
          <a href="/mcqtest" className="block py-2 px-4">
            Test
          </a>
          <a href="/downloads" className="block py-2 px-4">
            Downloads
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
