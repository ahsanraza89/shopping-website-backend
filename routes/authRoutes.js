import express from "express";
import { logIn, signUp , forgetPassword , resetPassword } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", logIn);

router.post("/signup", signUp);

router.post("/forget-password", forgetPassword);

router.post("/reset-password/:token", resetPassword);

export default router;
