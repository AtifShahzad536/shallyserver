import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/shally_portfolio";
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
    });
    isConnected = true;
    console.log(`[MongoDB Connected]: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB Warning]: Local MongoDB not accessible (${error.message}). Running in Graceful In-Memory/Offline Data Mode.`);
    isConnected = false;
  }
};

export const getDbStatus = () => isConnected;
