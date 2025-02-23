import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import config from './config/config.js';
import connectDB from './Database/dbConfig.js';
import authRoutes from './routes/auth.routes.js';
import reportRoutes from './routes/report.routes.js';
import feedbackRoutes from './routes/feedback.routes.js';
import customerRoutes from './routes/customer.routes.js';
import contactRoutes from './routes/contact.routes.js';
import communicationRoutes from './routes/communication.routes.js';
import userRoutes from './routes/user.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import userDashboardRoutes from './routes/userDashboard.routes.js';
import followUpRoutes from './routes/followUp.routes.js';
import mongoose from "mongoose";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors({
    origin: ["https://steady-gaufre-08d9fb.netlify.app", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

// ✅ Connect to Database
connectDB();

// ✅ Base Route
app.get("/", (req, res) => {
    res.send("Welcome to the Customer Relationship System API 🚀");
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/communication", communicationRoutes);
app.use("/api/user", userRoutes);
app.use("/api/followup", followUpRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/userdashboard", userDashboardRoutes);

// ✅ Handle missing favicon requests (Fixes 404 errors)
app.get("/favicon.ico", (req, res) => res.status(204).end());

// ✅ Error Handling Middleware (Handles incorrect API endpoints)
app.use((req, res, next) => {
    res.status(404).json({ error: "API route not found" });
});

// ✅ Global Error Handler (Catches unexpected errors)
app.use((err, req, res, next) => {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
});

// ✅ Start Server & Handle Shutdown Gracefully
const PORT = config.port || 5000;
const server = app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});

// 🔹 Handle process termination (closes DB connection)
process.on("SIGINT", async () => {
    console.log("🛑 Shutting down server...");
    await mongoose.connection.close();
    console.log("✅ MongoDB Disconnected.");
    process.exit(0);
});
