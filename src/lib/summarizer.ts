// // lib/summarizer.ts
"use server"
import { pipeline } from '@xenova/transformers';

export async function summarize(text: string) {
  const summarizer = await pipeline("summarization", "Xenova/bart-large-cnn");
  const summary = await summarizer(text);
  return summary;
}
