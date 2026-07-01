import express from "express";
import { z } from "zod";
import { login, logout, me, register } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

const router = express.Router();

const registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

const loginSchema = z.object({
  email: z.string().trim().email("Invalid email"),
  password: z.string().min(1, "Password is required")
});

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);
router.get("/me", protect, me);

export default router;
