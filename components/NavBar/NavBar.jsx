import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <div className="flex">
      <div className="block"></div>
      <div className="flex">
        <Link href="home">Home</Link>
        <Link href="typing">Typing</Link>
        <Link href="translator">Translator</Link>
        <Link href="test">Test</Link>
        <Link href="downloads">Downloads</Link>
      </div>
    </div>
  );
};

export default NavBar;
