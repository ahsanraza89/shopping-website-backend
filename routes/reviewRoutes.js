import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { addReview } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/:id" , protect , addReview)

export default router;