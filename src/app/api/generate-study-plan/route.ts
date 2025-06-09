// src/app/api/generate-study-plan/route.ts
import { connectDB } from "@/lib/connect";
import { generatePlan } from "@/lib/generate-plan";
import { Planner } from "@/models/planner";
import { Upload } from "@/models/upload";
import { NextResponse, NextRequest } from "next/server";

function extractJSON(text: string) {
  try {
    const start = text.indexOf("[");
    const end = text.lastIndexOf("]") + 1;
    const jsonString = text.slice(start, end);
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("Failed to parse plan:", e);
    return [];
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { uploadId, userId } = body;

    if (!uploadId || !userId) {
      return NextResponse.json(
        { error: "Missing uploadId or userId" },
        { status: 400 }
      );
    }

    await connectDB();
    const getSummary = await Upload.findById(uploadId);
    if (!getSummary) {
      return NextResponse.json({ error: "Upload not found" }, { status: 404 });
    }

    const planText = (await generatePlan(getSummary.summaryText)) || "{}";
    const parsedPlan = extractJSON(planText);

    const plan = new Planner({
      studyPlan: parsedPlan,
      uploadId,
      userId,
    });

    await plan.save();

    return NextResponse.json({ success: true, studyPlan: parsedPlan });
  } catch (error) {
    console.error("Error in generate-study-plan:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
