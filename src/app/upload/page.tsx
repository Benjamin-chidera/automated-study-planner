"use client";

import FileDropzone from "@/components/drag-drop/drag-drop";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const Upload = () => {
  const [files, setFiles] = useState<File[]>([]); // ✅ Proper typing

  const handleFilesAccepted = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles.slice(0, 1)); // ✅ Replace previous file
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("No files selected");
      return;
    }

    // connect api here
  };

  return (
    <main>
      <h1 className=" font-bold text-xl md:text-3xl">Upload Study Material</h1>
      <div className=" mt-10">
        <FileDropzone onFilesAccepted={handleFilesAccepted} />

        {files.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-bold mb-2">Uploaded Files</h2>
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li key={index} className="text-sm">
                  {file.name} ({Math.round(file.size / 1024)} KB)
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className=" text-right">
        <Button
          className=" mt-7 bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          disabled={files.length == 0}
          onClick={handleUpload}
        >
          Run OCR
        </Button>
      </div>
    </main>
  );
};

export default Upload;
