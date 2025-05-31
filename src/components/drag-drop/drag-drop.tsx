"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

interface FileDropzoneProps {
  onFilesAccepted: (files: File[]) => void;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({ onFilesAccepted }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesAccepted(acceptedFiles);
    },
    [onFilesAccepted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    multiple: false, // ✅ Only one file
  });

  return (
    <div
      {...getRootProps()}
      className={`border-dashed border-2 p-6 w-full h-[400px] rounded-md text-center cursor-pointer ${
        isDragActive ? "border-blue-500" : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="flex text-center items-center h-full justify-center">
          Drop the file here ...
        </p>
      ) : (
        <div>
          <p className="font-bold text-xl">Drag & drop or browse</p>
          <p className="font-medium text-sm">JPG, PNG, or PDF</p>
          <Button className="mt-5 cursor-pointer hover:bg-blue-600 hover:text-white border border-blue-600">
            Browse Files
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileDropzone;
