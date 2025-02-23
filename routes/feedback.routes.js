import express from "express";
import { Router } from "express";
import { getAllFeedback, createFeedback, getFeedbackByCustomer } from "../controllers/feedback.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get('/', verifyToken, getAllFeedback);
router.post('/', verifyToken, createFeedback);
router.get('/customer/:customerId', verifyToken, getFeedbackByCustomer);

export default router