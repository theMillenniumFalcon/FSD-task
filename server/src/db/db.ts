import mongoose from "mongoose";

export const connectDB = () => {
  mongoose.connect(process.env.DATABASE_URL)

  console.log("MongoDB Connected")
} 