import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

// Load environment variables
dotenv.config({ path: ".env" });

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log("✅ MongoDB connected successfully");

    // Handle application-level errors
    app.on("error", (err) => {
      console.error("❌ App error:", err);
      throw err;
    });

    // Start the server
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });

  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

startServer();
