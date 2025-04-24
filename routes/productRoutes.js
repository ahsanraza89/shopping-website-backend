import express from "express";
import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/create", createProduct);
router.get("/get", getProducts);
router.get("/get/:id", getProductById);
router.delete("/delete/:id", deleteProductById);

export default router;
