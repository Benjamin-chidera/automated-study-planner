import mongoose, { Schema, model, models } from "mongoose";

interface Upload {
  userId: mongoose.Types.ObjectId;
  filename: string;
  extractedText: string; // OCR or PDF text
  fileType: string; // MIME type of the file
  summaryText: string; // Summary of the text
}

const UploadSchema = new Schema<Upload>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    filename: { type: String, required: true },
    extractedText: { type: String, required: true },
    fileType: { type: String, required: true },
    summaryText: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Upload = models.Upload || model("Upload", UploadSchema);
