import express from "express";
import { Router } from "express";
import { getAllCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer } from "../controllers/customer.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";


const router = Router();

router.get('/', verifyToken, getAllCustomers);
router.get('/:id', [verifyToken, isAdmin], getCustomerById);
router.post('/', [verifyToken, isAdmin], createCustomer);
router.put('/:id', [verifyToken, isAdmin], updateCustomer);
router.delete('/:id', [verifyToken, isAdmin], deleteCustomer);

export default router;