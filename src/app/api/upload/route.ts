// src/app/api/upload/route.ts
import { HandlePDFExtract } from "@/utils/pdfParser";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse form data
    const formData = await req.formData();

    const file = formData.get("file") as File | null;
    const user = formData.get("userId") as string | null;

    console.log("User server:", user);

    if (!file) {
      console.error("No file uploaded");
      return NextResponse.json(
        { error: "No valid file uploaded" },
        { status: 400 }
      );
    }

    // Only allow PDFs in this route
    if (file.type !== "application/pdf") {
      console.error(`Unsupported file type: ${file.type}`);
      return NextResponse.json(
        {
          error: `Unsupported file type: ${file.type}. This endpoint only accepts PDFs.`,
        },
        { status: 400 }
      );
    }

    // Extract text from PDF
    const extractedText = await HandlePDFExtract(file);

    // Send extracted text to save-text endpoint for storage
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/save-text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          extractedText: extractedText,
          filename: file.name,
          userId: user,
          fileType: "pdf",
        }),
      });

      return NextResponse.json(
        { message: "PDF processed successfully", extractedText },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error saving extracted text:", error);
      return NextResponse.json(
        {
          error: `Error saving extracted text: ${
            (error as Error).message || "Unknown error"
          }`,
        },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        error: `Internal server error: ${
          (error as Error).message || "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
