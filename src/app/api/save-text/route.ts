import { connectDB } from "@/lib/connect";
import { Upload } from "@/models/upload";
import { NextResponse, NextRequest } from "next/server";
// import { pipeline } from "@xenova/transformers";

// import { GoogleGenAI } from "@google/genai";
import { summarize } from "@/lib/summarizer";
import { User } from "@/models/user";

// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  const { extractedText, filename, userId, fileType } = await req.json();

  try {
    // Save the text to a database or file or whatever
    await connectDB();

    // this is the summarization code - model (AI)
    const summary = await summarize(extractedText);

    // console.log("Save-text-api: ", summary);

    // increase user upload count
    const user = await User.findById(userId);

    if (user.uploadCount >= 5) {
      return NextResponse.json(
        { error: "Upload limit reached" },
        { status: 403 }
      );
    }

    user.uploadCount += 1;
    await user.save();

    // Save the text to the database
    const saved = new Upload({
      extractedText,
      filename,
      userId,
      fileType,
      summaryText: summary,
    });
    await saved.save();

    return NextResponse.json({ success: true }, { status: 200 });
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
