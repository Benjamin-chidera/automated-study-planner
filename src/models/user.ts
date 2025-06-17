import { Schema, models, model } from "mongoose";

interface User {
  email: string;
  password: string;
  fullname: string;
  image: string;
}

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
  },
  {
    timestamps: true,
  }
);

export const User = models.User || model<User>("User", userSchema);
