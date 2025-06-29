import { Schema, models, model } from "mongoose";

interface AvailabilityItem {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  type: string; // e.g., "break", "study", etc.
  label: string;
}

interface User {
  email: string;
  password: string;
  fullname: string;
  image: string;
  uploadCount: number;
  availability?: AvailabilityItem[];
}

const availabilitySchema = new Schema<AvailabilityItem>(
  {
    id: { type: String, required: true },
    day: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    type: { type: String, required: true },
    label: { type: String, required: true },
  },
  { _id: false } // Avoids creating `_id` for each subdocument
);

const userSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    fullname: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },

    uploadCount: { type: Number, default: 0 },

    availability: {
      type: [availabilitySchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const User = models.User || model<User>("User", userSchema);
