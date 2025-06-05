import { connectDB } from "@/lib/connect";
import { Upload } from "@/models/upload";
import { NextResponse, NextRequest } from "next/server";
import { pipeline } from "@xenova/transformers";

export async function POST(req: NextRequest) {
  const { extractedText, filename, userId, fileType } = await req.json();

  try {
    // Save the text to a database or file or whatever
    await connectDB();

    // this is the summarization code - model (AI)
    const summarizer = await pipeline("summarization", "Xenova/bart-large-cnn");

    const summary = await summarizer(extractedText);
    // console.log(summary);

    // Save the text to the database
    const saved = new Upload({
      extractedText,
      filename,
      userId,
      fileType,
      summaryText: summary[0]?.summary_text,
    });
    await saved.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);

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
