import { Router } from "express";
import authController from '../controllers/user.controller.js';
const router = Router();

router.get("/", authController.getUser);
router.post("/signup", authController.signUpUser);
router.post("/login", authController.loginUser);

export default router;