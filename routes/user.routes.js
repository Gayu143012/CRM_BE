import express from "express";
import { Router } from "express";
import { getAllUsers, updateUser, deleteUser, updateUserRole, updateUserProfile } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = Router();

router.get('/', [verifyToken, isAdmin], getAllUsers);
router.put('/:id', [verifyToken, isAdmin], updateUser);
router.delete('/:id', [verifyToken, isAdmin], deleteUser);
router.patch('/:id/role', [verifyToken, isAdmin], updateUserRole);
router.put('/profile', verifyToken, updateUserProfile);

export default router;