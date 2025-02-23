import express from "express";
import { Router } from "express";
import { getSalesReport, getConversionRates, getAdminReports, getSalesOverTime, getMonthlyPerformanceReport, getTextileSpecificReport } from "../controllers/report.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = Router();

router.get('/sales', verifyToken, getSalesReport);
router.get('/conversion-rates', verifyToken, getConversionRates);
router.get('/admin', [verifyToken, isAdmin], getAdminReports);
router.get('/sales-over-time', [verifyToken, isAdmin], getSalesOverTime);
router.get('/textile-specific', [verifyToken, isAdmin], getTextileSpecificReport);
router.get('/monthly-performance', [verifyToken, isAdmin], getMonthlyPerformanceReport);



export default router