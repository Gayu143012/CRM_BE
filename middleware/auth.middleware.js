import jwt from "jsonwebtoken";
import config from "../config/config.js";
import dotenv from "dotenv";

dotenv.config();

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded.user; // Store decoded user in request
        next();
    } catch (err) {
        console.error("Token verification failed:", err);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

// Middleware to verify admin registration
export const verifyAdminRegistration = (req, res, next) => {
    if (req.body.role === "admin") {
        if (!req.body.adminCode) {
            return res.status(403).json({ message: "Admin registration code is required" });
        }

        if (req.body.adminCode !== process.env.ADMIN_REGISTRATION_CODE) {
            return res.status(403).json({ message: "Invalid admin registration code" });
        }
    }
    next();
};
