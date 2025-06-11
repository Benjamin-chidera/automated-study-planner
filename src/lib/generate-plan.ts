import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generatePlan(text: string) {
  // Get current date and time
  const now = new Date();
  const currentDateTime = now.toISOString();
  
  // Calculate minimum future time (1 hour from now)
  const minFutureTime = new Date(now.getTime() + 60 * 60 * 1000).toISOString();
  
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `
    You are a study planner assistant. Given a study material summary, generate a weekly study plan.
    
    IMPORTANT: Current date and time is ${currentDateTime}
    All study sessions must be scheduled for ${minFutureTime} or later (at least 1 hour in the future).
    
    Each item should include:
    - A topic (based on the summary)
    - An ISO 8601 date-time string for when to study it (must be in the future)
    
    Return the result as a JSON array in this exact format, with no additional text or markdown:
    [
      { "topic": "Study Math", "dueDate": "2025-06-10T10:00:00Z" },
      { "topic": "Read AI Paper", "dueDate": "2025-06-11T14:00:00Z" }
    ]
    
    Summary:
    ${text}
    `,
  });
  
  return response.text;
}