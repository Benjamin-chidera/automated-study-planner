// // lib/summarizer.ts
"use server";
// import { pipeline } from "@xenova/transformers";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function summarize(text: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `
  ${text}
  
  Please analyze the above academic content and generate a structured breakdown suitable for university students. The output should be in clean, readable **Markdown format** with proper numbering and bold headings. Avoid using asterisks for bold — use proper markdown syntax (i.e., double asterisks around headings).
  
  Format:
  1. **Summary of the Text**  
     - A concise overview of the material in simple academic language.
  
  2. **Key Topics Covered**  
     - List of main themes or subjects.
  
  3. **Suggested Study Tasks**  
     - Numbered actions students should take (e.g., 1. Read chapter, 2. Solve exercises, etc.)
  
  4. **Estimated Study Time**  
     - Approximate how much time each task may take, assuming an average learning pace.
  
  5. **Learning Objectives**  
     - What should the student be able to understand or do after studying this material?
  
  6. **Follow-up Suggestions** *(optional)*  
     - Extra tips, links, or practice recommendations for additional practice, resources, or related topics to explore..
  
  Ensure the formatting is clear, consistent, and helpful for students planning their study schedules.
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
