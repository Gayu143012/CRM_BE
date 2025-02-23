import { Router } from "express";
import { register, login, getUser } from "../controllers/auth.controller.js";
import { verifyToken, verifyAdminRegistration } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", verifyAdminRegistration, register);
router.post("/login", login);
router.get("/user", verifyToken, getUser);

export default router;
