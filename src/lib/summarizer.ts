// // lib/summarizer.ts
"use server";
// import { pipeline } from "@xenova/transformers";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function summarize(text: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `
    Generated Summary:
    ${text}

    Please analyze the following study content and provide a structured breakdown suitable for university students:

    1. **Summary of the Text:** A clear and concise overview of the content.
    2. **Key Topics Covered:** List the main concepts, chapters, or themes discussed.
    3. **Suggested Study Tasks:** Based on the content, suggest appropriate study actions (e.g., read, memorize, solve exercises, create flashcards, write summaries).
    4. **Estimated Study Time:** Approximate how much time each task may take, assuming an average learning pace.
    5. **Learning Objectives:** What should the student be able to understand or do after studying this material?
    6. **Follow-up Suggestions:** Optional recommendations for additional practice, resources, or related topics to explore.

    Return the response in clean, student-friendly markdown format.
    `,
  });
//   console.log(response.text);

  return response.text;



//   old code: 
  //   const summarizer = await pipeline("summarization", "Xenova/bart-large-cnn");

  //   const input = `
  //   Text:
  //   ${text}

  //   Please provide:
  //   1. Key topics covered
  //   2. Study task types (e.g., reading, exercises)
  //   3. Estimated time to study each section
  //   `;

  //   const summary = await summarizer(input);

  //   console.log("lib", summary);

  //   return summary[0].summary_text;
}
