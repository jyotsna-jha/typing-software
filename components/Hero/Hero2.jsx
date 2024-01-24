"use client";
import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import Link from "next/link";

const Herosection = ({ title, subtitle }) => {
  const lottieContainerRef = useRef(null);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: lottieContainerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/assets/typing.json",
    });

    return () => {
      animation.destroy();
    };
  }, []);

  return (
    <main className=" bg-gradient-to-b from-white to-red-300 via-gray-100 font-poppins ">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col items-start py-14 ml-10">
            <h1 className="font-bold text-3xl md:text-5xl lg:text-6xl text-gray-600 uppercase mb-2 sm:mb-4 md:mb-6 leading-snug mt-10">
              {title}
            </h1>
            <p className="mt-2 sm:mt-4 md:mt-8 text-sm sm:text-base md:text-lg md:leading-relaxed sm:word-spacing-0.02 md:word-spacing-0.05 text-gray-600">
              Type faster, type smarter with Anand Typing. Boost your typing
              skills through engaging lessons and challenges. Join us today and
              unleash your typing potential! Whether you're a beginner or
              looking to enhance your skills, Anand Typing is your key to typing
              excellence.
            </p>
            <Link href="/englishtypingtest">
              <div className="mt-6">
                <button className="text-white bg-red-400 hover:bg-red-500 px-4 py-2 rounded-md">
                  Tests
                </button>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex justify-end items-center">
            <div ref={lottieContainerRef} id="lottie-animation"></div>
          </div>
        </div>
      </div>
      <div className="custom-shape-divider-bottom-1681647578 -z-10">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill fill-white"
          ></path>
        </svg>
      </div>
    </main>
  );
};

export default Herosection;
