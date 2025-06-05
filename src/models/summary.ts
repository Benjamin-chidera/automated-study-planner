import mongoose, { Schema } from "mongoose";

interface Summary {
  uploadId: mongoose.Types.ObjectId; // Reference to Upload
  summaryText: string;
}

const summarySchema = new Schema<Summary>(
  {
    uploadId: { type: Schema.Types.ObjectId, ref: "Upload", required: true },
    summaryText: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Summary = mongoose.model<Summary>("Summary", summarySchema);
