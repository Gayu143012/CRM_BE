import mongoose from "mongoose";
import config from "../config/config.js";

const connectDB = async () => {
    try {
        if (!config.mongodbUrl) {
            throw new Error("❌ MongoDB URL is not set in environment variables");
        }

        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        await mongoose.connect(config.mongodbUrl, options);
        console.log("✅ MongoDB Connected Successfully...");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1); // Exit the process if DB connection fails
    }
};

export default connectDB;
