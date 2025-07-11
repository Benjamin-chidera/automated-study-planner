// src/app/upload/page.tsx
"use client";

import FileDropzone from "@/components/drag-drop/drag-drop";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import OcrImage from "@/components/ocr/ocr-image";

import { summarize } from "@/lib/summarizer";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const Upload = ({
  user,
  count,
}: {
  user: string | undefined;
  count: number;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();


  const [hasRefreshed, setHasRefreshed] = useState(false);

  // console.log(count);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("refresh") === "true") {
      window.location.replace("/upload");
      // After a login redirect, the page data might be stale from the cache.
      // This forces a refresh of the server data without a full page reload.
      if (searchParams.get("refresh") === "true" && !hasRefreshed) {
        setHasRefreshed(true);
        router.refresh();
      }
    }
  }, [searchParams, router, hasRefreshed]);

  const handleFilesAccepted = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles.slice(0, 1));
  };

  // handle file upload
  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("No files selected");
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

        // Send summarized text to backend for storage
        const summary = await summarize(extractedText);

        // Send extracted text from the image to backend for storage
        const response = await axios.post("/api/save-text", {
          extractedText: extractedText,
          userId: user,
          filename: file.name,
          fileType: "image",
          summaryText: summary,
        });

        setFiles([]);

        console.log(response);

        if (response.status === 200) {
          toast.success("Image uploaded successfully!");
          const timeout = setTimeout(() => {
            router.push("/uploaded-materials");
          }, 2000);
          return () => clearTimeout(timeout);
        } else {
          throw new AxiosError(
            "Unexpected response status",
            response.status.toString()
          );
        }
      } else if (file instanceof File && file.type === "application/pdf") {
        // Send PDF to backend for text extraction
        const response = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setFiles([]);

        if (response.status === 200) {
          toast.success("PDF uploaded successfully!");
          const timeout = setTimeout(() => {
            router.push("/uploaded-materials");
          }, 2000);
          return () => clearTimeout(timeout);
        } else {
          throw new AxiosError(
            "Unexpected response status",
            response.status.toString()
          );
        }
      } else {
        toast.error("Selected file is not an image or PDF");
        return;
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Error:", error.response?.data || error.message);
        const errorMessage =
          error.response?.status === 403
            ? "Upload limit reached (5 uploads maximum)"
            : error.response?.data?.error || error.message;
        toast.error(`Error: ${errorMessage}`);
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main>
      <div className="flex justify-between items-center mb-10">
        <h1 className="font-bold text-xl md:text-3xl">Upload Study Material</h1>
        <p className="text-gray-600 text-sm md:text-base font-bold">
          {count}/5
        </p>
      </div>
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
          disabled={files.length === 0 || isProcessing || count >= 5}
          onClick={handleUpload}
        >
          {isProcessing ? "Processing..." : "Run OCR"}
        </Button>
      </div>
    </main>
  );
};

export default Upload;
