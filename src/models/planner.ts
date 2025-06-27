import mongoose, { Schema, model, models } from "mongoose";

interface Planner {
  userId: mongoose.Types.ObjectId;
  uploadId: mongoose.Types.ObjectId; // Link to Summary
  studyPlan: {
    topic: string;
    dueDate?: Date;
    notified: boolean;
  }[];

  status: string; // active, inactive, completed
  hasGeneratedAStudyPlan: boolean; // Whether a study plan has been generated for this upload
  fileName: string; // Name of the uploaded file
  isCompleted: boolean; // Whether the study plan has been completed
}

const plannerSchema = new Schema<Planner>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    uploadId: { type: Schema.Types.ObjectId, ref: "Upload", required: true },
    studyPlan: [
      {
        topic: { type: String, required: true },
        dueDate: { type: Date },
        notified: { type: Boolean, default: false },
      },
    ],
    status: {
      type: String,
      default: "active",
      enum: ["active", "completed"],
    },
    hasGeneratedAStudyPlan: { type: Boolean, default: false },
    fileName: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Planner =
  models.Planner || model<Planner>("Planner", plannerSchema);
