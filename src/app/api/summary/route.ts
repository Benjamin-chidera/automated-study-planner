// import { Upload } from "@/models/upload";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { newSummary } = await req.json();

    if (!newSummary) {
      return NextResponse.json({ error: "newSummary is required" }, { status: 400 });
    }

    console.log("newSummary", newSummary);

    console.log("params", params);
    
    

    // const updatedUpload = await Upload.findByIdAndUpdate(
    //   params.id,
    //   { summaryText: newSummary },
    //   { new: true }
    // );

    // if (!updatedUpload) {
    //   return NextResponse.json({ error: "Upload not found" }, { status: 404 });
    // }

    // return NextResponse.json(updatedUpload, { status: 200 });
  } catch (error) {
    console.error("Error updating summary:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}