import express from 'express';
import { getUserDashboardData, getPopularTextileChoices, getFollowUpActions, getTasksDue, getTotalCustomers, getNewCustomersThisMonth, getTopSpendingCustomer } from '../controllers/dashboard.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/user', verifyToken, getUserDashboardData);
router.get('/populartextilechoices', verifyToken, getPopularTextileChoices);
router.get('/followupactions', verifyToken, getFollowUpActions);
router.get('/tasksdue', verifyToken, getTasksDue);
router.get('/totalcustomers', verifyToken, getTotalCustomers);
router.get('/newcustomersthismonth', verifyToken, getNewCustomersThisMonth);
router.get('/topspendingcustomer', verifyToken, getTopSpendingCustomer);


export default router;