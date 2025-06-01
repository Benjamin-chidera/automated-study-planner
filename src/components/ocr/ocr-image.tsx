// src/components/ocr/ocr-image.ts
import { createWorker } from "tesseract.js";

export default async function OcrImage(file: File): Promise<string> {
  const worker = await createWorker("eng");
  try {
    const {
      data: { text },
    } = await worker.recognize(file);
    console.log("OCR result:", text);
    return text;
  } finally {
    await worker.terminate();
  }
}
