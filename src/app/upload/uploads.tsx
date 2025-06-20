// src/app/upload/page.tsx
"use client";

import FileDropzone from "@/components/drag-drop/drag-drop";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import OcrImage from "@/components/ocr/ocr-image";

import { summarize } from "@/lib/summarizer";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Upload = ({ user }: { user: string | undefined }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleFilesAccepted = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles.slice(0, 1));
  };

  // handle file upload
  const handleUpload = async () => {
    if (files.length === 0) {
      alert("No files selected");
      return;
    }

    setIsProcessing(true);
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("userId", user ?? "");

    const file = formData.get("file");

    try {
      let extractedText = "";

      if (file instanceof File && file.type.startsWith("image/")) {
        // Handle image OCR in the frontend
        extractedText = await OcrImage(file);

        // send summarized text to backend for storage
        const summary = await summarize(extractedText);

        // console.log(summary);

        // Send extracted text from the image to backend for storage
        const data = await axios.post("/api/save-text", {
          extractedText: extractedText,
          userId: user,
          filename: file.name,
          fileType: "image",
          summaryText: summary,
        });

        setFiles([]);

        if (data.status === 200) {
          toast.success("PDF uploaded successfully!");

          const timeout = setTimeout(() => {
            router.push("/uploaded-materials");
          }, 2000);

          // clear timeout after 2 seconds
          return () => clearTimeout(timeout);
        }
      } else if (file instanceof File && file.type === "application/pdf") {
        // Send PDF to backend for text extraction
        const data = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setFiles([]);

        if (data.status === 200) {
          toast.success("PDF uploaded successfully!");

          const timeout = setTimeout(() => {
            router.push("/uploaded-materials");
          }, 2000);

          // clear timeout after 2 seconds
          return () => clearTimeout(timeout);
        }
      } else {
        // alert("Selected file is not an image or PDF");
        toast.error("Selected file is not an image or PDF");
        return;
      }

      //   change to a success message (modal)
      // return <Toast />;
      // toast.success("Text extracted and saved successfully!");
      // alert("Text extracted and saved successfully!");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Error:", error.response?.data || error.message);

        // change to an error message (modal)
        // alert(`Error: ${error.response?.data?.error || error.message}`);
        toast.error(`Error: ${error.response?.data?.error || error.message}`);
      } else {
        console.error("Unexpected error:", error);

        // change to an error message (modal)
        // alert("An unexpected error occurred");
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main>
      <h1 className="font-bold text-xl md:text-3xl">Upload Study Material</h1>
      <div className="mt-10">
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

      <div className="text-right">
        <Button
          className="mt-7 bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          disabled={files.length === 0 || isProcessing}
          onClick={handleUpload}
        >
          {isProcessing ? "Processing..." : "Run OCR"}
        </Button>
      </div>
    </main>
  );
};

export default Upload;
