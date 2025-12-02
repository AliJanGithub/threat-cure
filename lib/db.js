import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // Already connected → don't reconnect
    if (mongoose.connection.readyState === 1) {
      console.log("\x1b[32m✓ MongoDB already connected\x1b[0m");
      return mongoose.connection.asPromise();
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "threat_cure",
    });

    console.log("\x1b[36m✓ MongoDB connected successfully\x1b[0m");

  } catch (error) {
    console.error("\x1b[31m✗ MongoDB connection error:\x1b[0m", error);
  }
};
