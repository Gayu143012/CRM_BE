import express from "express";
import { Router } from "express";
import { sendFollowUpAction } from "../controllers/followUp.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/send', verifyToken, sendFollowUpAction);

export default router;