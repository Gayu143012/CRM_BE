//config/CONFIG.JS

import dotenv from "dotenv";
import fs from "fs";

// Determine the environment file to load
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.local";

// Check if the environment file exists; if not, fallback to `.env`
try {
    if (fs.existsSync(envFile)) {
        dotenv.config({ path: envFile });
        console.log(`✅ Loaded environment variables from ${envFile}`);
    } else {
        dotenv.config();
        console.warn(`⚠️ ${envFile} not found. Falling back to default .env file`);
    }
} catch (error) {
    console.error(`❌ Error loading environment variables: ${error.message}`);
    process.exit(1);
}

// Configuration object
const config = {
    port: process.env.PORT || 5000,
    mongodbUrl: process.env.MONGODB_URL,
    jwtSecret: process.env.JWT_SECRET,
    emailId: process.env.EMAIL_ID,
    emailPass: process.env.EMAIL_PASS,
    clientUrl: process.env.CLIENT_URL,
    adminRegistrationCode: process.env.ADMIN_REGISTRATION_CODE
};

export default config;
