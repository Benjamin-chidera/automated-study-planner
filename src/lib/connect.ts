import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "study-planner",
    });
    console.log(`server listening`);
  } catch (error) {
    console.log(error);
  }
};
