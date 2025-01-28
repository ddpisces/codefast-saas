import mongoose from "mongoose";
import User from "@/models/User";
import Board from "@/models/Board";

export default async function connectMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
}
