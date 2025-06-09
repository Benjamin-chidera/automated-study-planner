import mongoose, { Schema, model, models } from "mongoose";

interface Planner {
  userId: mongoose.Types.ObjectId;
  uploadId: mongoose.Types.ObjectId; // Link to Summary
  studyPlan: {
    topic: string;
    dueDate?: Date;
  }[];

  status: string; // active, inactive, completed
}

const plannerSchema = new Schema<Planner>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    uploadId: { type: Schema.Types.ObjectId, ref: "Upload", required: true },
    studyPlan: [
      {
        topic: { type: String, required: true },
        dueDate: { type: Date },
      },
    ],
    status: {
      type: String,
      default: "inactive",
      enum: ["active", "inactive", "completed"],
    },
  },
  {
    timestamps: true,
  }
);

export const Planner = models.Planner || model<Planner>("Planner", plannerSchema);
