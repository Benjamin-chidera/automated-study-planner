import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";
import PDFParser from "pdf2json";

export async function HandlePDFExtract(file: File): Promise<string> {
  // Generate a unique filename
  const fileName = uuidv4();
  const tempFilePath = process.env.VERCEL
    ? `/tmp/${fileName}.pdf`
    : `./uploads/${fileName}.pdf`;

  // Ensure the uploads directory exists (for non-serverless environments)
  if (!process.env.VERCEL) {
    await fs.mkdir("./uploads", { recursive: true });
    console.log("Uploads directory created: ./uploads");
  }

  // Convert ArrayBuffer to Buffer and save the file
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  if (fileBuffer.length === 0) {
    throw new Error("Uploaded file is empty");
  }
  await fs.writeFile(tempFilePath, fileBuffer);
  console.log("File saved at:", tempFilePath);

  // Parse the PDF using pdf2json
  //   const pdfParser = new PDFParser(null, 1);
  const pdfParser = new PDFParser(null, true);

  // Wrap pdf2json's event-based parsing in a Promise
  const parsePromise = new Promise<string>((resolve, reject) => {
    pdfParser.on(
      "pdfParser_dataError",
      (errData: Record<"parserError", Error>) => {
        console.error("PDF parsing error:", errData.parserError.message);
        reject(new Error(errData.parserError.message));
      }
    );

    pdfParser.on("pdfParser_dataReady", () => {
      const extractedText = pdfParser.getRawTextContent();
      console.log("PDF parsed, extracted text length:", extractedText.length);
      resolve(extractedText);
    });
  });

  // Load and parse the PDF
  pdfParser.loadPDF(tempFilePath);

  // Wait for parsing to complete
  const extractedText = await parsePromise;

  // Clean up the temporary file
  await fs.unlink(tempFilePath).catch((err) => {
    console.error("Cleanup error:", err);
  });

  return extractedText;
}
