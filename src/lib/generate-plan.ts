import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generatePlan(text: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `
    You are a study planner assistant. Given a study material summary, generate a weekly study plan.

    Each item should include:
    - A topic
    - An ISO 8601 date-time string (suggest when to study it, spread across the week)

    Return the result as a JSON array in this exact format:

    [
    { "topic": "Study Math", "dueDate": "2025-06-10T10:00:00Z" },
    { "topic": "Read AI Paper", "dueDate": "2025-06-11T14:00:00Z" }
    ]

    Summary:
    ${text}
    `,
  });

  //   console.log(response.text);

  return response.text;
}
