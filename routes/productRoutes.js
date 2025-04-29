import express from "express";
import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
} from "../controllers/productController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", createProduct);
router.get("/get", protect, getProducts);
router.get("/get/:id", getProductById);
router.delete("/delete/:id", deleteProductById);

export default router;
