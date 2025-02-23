import express from 'express';
import { getUserDashboardData } from '../controllers/userDashboard.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', verifyToken, getUserDashboardData);

export default router;