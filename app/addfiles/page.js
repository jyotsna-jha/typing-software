"use client";

import React, { useState, useEffect } from "react";
import AddFile from "@/components/Downloads/AddFile";

const AddFilePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch("http://localhost:3000/verify-auth", {
          credentials: "include",
        });
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Error verifying auth:", error);
        window.location.href = "/login";
      }
    };

    verifyAuth();
  }, []);

  if (!isLoggedIn) {
    return null; // Or a loading indicator
  }

  return <AddFile />;
};

export default AddFilePage;
