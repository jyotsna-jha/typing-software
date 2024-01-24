// components/DownloadsComponent.jsx
"use client";

import React, { useState, useEffect } from "react";

const DownloadsComponent = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("http://localhost:3000/files");
        const data = await response.json();
        setFiles(data);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold text-gray-700 mb-4">
        Downloadable PDFs
      </h1>
      <ul className="space-y-3">
        {files.map((file) => (
          <li
            key={file.file_id}
            className="bg-gray-100 p-4 rounded-md shadow-sm"
          >
            <h2 className="font-semibold text-gray-700">
              <a
                href={`http://localhost:3000/uploads/${encodeURIComponent(
                  file.file_name
                )}`}
              >
                {file.file_name}
              </a>
              <a />
            </h2>
            <div className="flex space-x-2 mt-2">
              <a
                href={`http://localhost:3000/uploads/${encodeURIComponent(
                  file.file_name
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                View
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DownloadsComponent;
