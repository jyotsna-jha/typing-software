"use client";

import React, { useState, useEffect } from "react";
import ChangePasswordForm from "@/components/Admin/ChangePasswordForm";
import Link from "next/link";
const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch("http://localhost:3000/verify-auth", {
          credentials: "include",
        });
        if (!response.ok) {
          // Redirect to login page if not authenticated
          window.location.href = "/login";
        } else {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error verifying auth:", error);
        // Redirect to login page on error
        window.location.href = "/login";
      }
    };

    verifyAuth();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setIsLoggedIn(false);
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleChangePasswordForm = () => {
    setShowChangePassword(!showChangePassword);
  };

  if (!isLoggedIn) return null;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-5">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-10">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <a
            href="addtest"
            className="block bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">Add Test</h2>
            <p className="text-gray-600">Manage and add new tests.</p>
          </a>
          <a
            href="addenglishtext"
            className="block bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">Add English Text</h2>
            <p className="text-gray-600">
              Add or modify English text contents.
            </p>
          </a>
          <a
            href="addhinditext"
            className="block bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">Add Hindi Text</h2>
            <p className="text-gray-600">
              Insert and edit Hindi language text.
            </p>
          </a>
          <a
            href="addfiles"
            className="block bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">Add Files</h2>
            <p className="text-gray-600">Upload and manage various files.</p>
          </a>
        </div>

        <div className="flex justify-end mb-4">
          <button
            onClick={toggleChangePasswordForm}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Change Password
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
        {showChangePassword && <ChangePasswordForm />}
      </div>
    </div>
  );
};

export default AdminPage;
