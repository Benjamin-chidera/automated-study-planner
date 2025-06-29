import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generatePlan(
  summaryText: string,
  availability?: string,
  busyTimes?: string
) {
  const now = new Date();
  const currentDateTime = now.toISOString();
  const minFutureTime = new Date(now.getTime() + 60 * 60 * 1000).toISOString();

  const availabilityNote = availability
    ? `ONLY schedule sessions within the following availability slots: ${availability}.`
    : `No availability was provided. Schedule anytime starting from ${minFutureTime}.`;

  const busyNote = busyTimes
    ? `Avoid scheduling during these times: ${busyTimes}`
    : `No existing sessions to avoid.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `
You are a helpful AI study assistant. Your job is to create a weekly study plan based on a user's study material summary.

Instructions:
- Current time: ${currentDateTime}
- Sessions must begin at least 1 hour from now (${minFutureTime} or later)
- ${availabilityNote}
- ${busyNote}
- Schedule one topic per session
- Return only a valid JSON array of objects with this format:

[
  { "topic": "Topic Name", "dueDate": "2025-06-11T10:00:00Z" }
]

Study Summary:
${summaryText}
    `,
  });

  return response.text;
}
