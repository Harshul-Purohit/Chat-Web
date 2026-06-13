import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // no extra options needed
    console.log(" Database connected");
  } catch (error) {
    console.error(" Database connection failed:", error.message);
    process.exit(1); // stop server if DB fails
  }
};

export default connectDB;

