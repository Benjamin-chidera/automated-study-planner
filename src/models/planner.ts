import mongoose, { Schema } from "mongoose";

interface Planner {
  userId: mongoose.Types.ObjectId;
  summaryId: mongoose.Types.ObjectId; // Link to Summary
  title: string;
  studyPlan: {
    topic: string;
    description: string;
    dueDate?: Date;
  }[];
  createdAt: Date;
}

const plannerSchema = new Schema<Planner>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  summaryId: { type: Schema.Types.ObjectId, ref: "Summary", required: true },
  title: { type: String, required: true },
  studyPlan: [
    {
      topic: { type: String, required: true },
      description: { type: String },
      dueDate: { type: Date },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export const Planner = mongoose.model<Planner>("Planner", plannerSchema);
