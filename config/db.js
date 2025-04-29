import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(URI);

    console.log("mongo connected");
  } catch (error) {
    console.log("MongoDB connection fails:", error.message);
  }
};

export default connectDB;
