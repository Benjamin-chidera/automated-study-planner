import mongoose, { Schema, model, models } from "mongoose";

interface Upload {
  userId: mongoose.Types.ObjectId;
  filename: string;
  extractedText: string; // OCR or PDF text
  fileType: string; // MIME type of the file
  summaryText: string; // Summary of the text
  hasGeneratedAStudyPlan: boolean; // Whether a study plan has been generated for this upload
}

const UploadSchema = new Schema<Upload>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    filename: { type: String, required: true },
    extractedText: { type: String, required: true },
    fileType: { type: String, required: true },
    summaryText: { type: String, required: true },
    hasGeneratedAStudyPlan: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Upload = models.Upload || model("Upload", UploadSchema);
