import { Router } from "express";
import { validate } from "../../middlewares/validate";
import { createUserSchema } from "../../models/User";
import { getMe, login, refreshToken, register, logout } from "./auth.controller";
import { loginSchema } from "./auth.schema";
import { authenticate } from "../../middlewares/auth.middleware";

const router = Router()

router.post("/register", validate(createUserSchema), register)
router.post("/login", validate(loginSchema), login)
router.post("/refresh", refreshToken)
router.post("/logout", authenticate, logout)
router.get("/me", authenticate, getMe)

export default router