import express from "express";
import { createUser, getUser, getById } from "../controllers/userController.js";

const router = express.Router();
router.post("/crt", createUser);

router.get("/", getUser);

router.get("/:id", getById);

export default router;
