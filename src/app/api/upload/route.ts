// src/app/api/upload/route.ts

import { HandlePDFExtract } from "@/utils/pdfParser";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse form data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      console.error("No file uploaded");
      return NextResponse.json(
        { error: "No valid file uploaded" },
        { status: 400 }
      );
    }

    // Allow PDF and common image file types
    const allowedFileTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
    ];
    if (!allowedFileTypes.includes(file.type)) {
      console.error(`Unsupported file type: ${file.type}`);
      return NextResponse.json(
        {
          error: `Unsupported file type: ${file.type}. Allowed types are PDF, PNG, JPEG, JPG.`,
        },
        { status: 400 }
      );
    }

    let extractedText = "";

    if (file.type === "application/pdf") {
      extractedText = await HandlePDFExtract(file);
      console.log(extractedText);
    } else {
      // extract text from image coming soon
      console.log("Image extraction not yet implemented");
      return NextResponse.json(
        { error: "Image extraction not yet supported" },
        { status: 200 }
      );
    }

    return NextResponse.json({ extractedText }, { status: 200 });
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
