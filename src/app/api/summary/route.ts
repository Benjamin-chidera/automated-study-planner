// import { NextRequest } from "next/server";
// import { pipeline } from "@xenova/transformers";

export async function POST() {
  try {
    // const { summaryText } = await req.json();

    // if (!summaryText || typeof summaryText !== "string") {
    //   return NextResponse.json({ error: "Invalid summaryText" }, { status: 400 });
    // }
    console.log("hello");

    // const summarizer = await pipeline("summarization", "Xenova/bart-large-cnn");

    // const summary = await summarizer(summaryText);
    // console.log(summary);

    // return summary

    // return summary[0].summary_text;

    // return NextResponse.json({ summary });
  } catch (error) {
    console.log(error);
  }
}
