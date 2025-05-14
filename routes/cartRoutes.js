import express from "express";
import { addToCart, getCart, removeFromCart, updateQuantity, deleteCart } from "../controllers/cartController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Add item to cart (POST)
router.post("/add" ,protect ,  addToCart);

// Get user's cart (GET)
router.get("/get", protect, getCart);

// Remove item from cart (DELETE)
router.delete("/remove/:id", protect, removeFromCart);

// Update item quantity (PUT)
router.put("/quantity/:id", protect, updateQuantity);

// Delete entire cart (DELETE)
router.delete("/delete/:id", protect, deleteCart);

export default router;
