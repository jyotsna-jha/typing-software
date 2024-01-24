"use client";

import React, { useState, useEffect } from "react";

const FileUploadComponent = () => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Fetch and display files on component mount
    fetchFiles();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const result = await response.json();
      alert(result.message);
      fetchFiles(); // Refresh file list after upload
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await fetch("http://localhost:3000/files"); // Your endpoint to list files
      const data = await response.json();
      console.log(data);
      setFiles(data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const deleteFile = async (fileId) => {
    try {
      const response = await fetch(`http://localhost:3000/files/${fileId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await response.json();
      alert(result.message);
      fetchFiles();
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Error deleting file");
    }
  };
  const getFileUrl = (fileName) => {
    if (!fileName) {
      console.error("Filename is undefined");
      return "#"; // Return a fallback URL or handle this case appropriately
    }
    return `http://localhost:3000/uploads/${encodeURIComponent(fileName)}`;
  };
  return (
    <div className="container mx-auto p-4">
      <input
        type="file"
        onChange={handleFileChange}
        className="border border-gray-300 p-2 rounded"
      />
      <button
        onClick={uploadFile}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
      >
        Upload
      </button>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Uploaded Files</h2>
        <ul>
          {files.map((file) => (
            <li key={file.file_id} className="mt-2">
              <a
                href={getFileUrl(file.file_name)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                {file.file_name}
              </a>
              <button
                onClick={() => window.open(getFileUrl(file.file_name))}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded ml-2"
              >
                View
              </button>
              <button
                onClick={() => deleteFile(file.file_id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FileUploadComponent;
