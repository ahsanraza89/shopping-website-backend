import Cart from "../models/Cart.js";
import Product from "../models/Products.js"; // if you want to verify product

// Add item to cart or update quantity
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // User ID from the authentication middleware
    const { productId, quantity } = req.body;

    // Check if the cart exists for the user
    let cart = await Cart.findOne({ userId });

    // If no cart exists, create a new one
    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ product: productId, quantity }],
        totalPrice: 0, // Price will be updated when products are added
      });
    } else {
      // If cart exists, check if the product is already in the cart
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex !== -1) {
        // Product is in the cart, update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Product is not in the cart, add it
        cart.items.push({ product: productId, quantity });
      }
    }

    // Calculate total price (you can adjust based on your product model)
    let totalPrice = 0;
    for (let item of cart.items) {
      const product = await Product.findById(item.product);
      if (product) {
        totalPrice += product.price * item.quantity; // Assuming each product has a `price` field
      }
    }

    // Update total price in the cart
    cart.totalPrice = totalPrice;

    // Save the cart
    await cart.save();

    return res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get user's cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id; // User ID from the authentication middleware

    const cart = await Cart.findOne({ userId }).populate('items.product');

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    return res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id; // User ID from the authentication middleware
    const { productId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    // Remove the item from the cart
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    // Recalculate the total price
    let totalPrice = 0;
    for (let item of cart.items) {
      const product = await Product.findById(item.product);
      if (product) {
        totalPrice += product.price * item.quantity;
      }
    }

    cart.totalPrice = totalPrice;

    // Save the updated cart
    await cart.save();

    return res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update item quantity
export const updateQuantity = async (req, res) => {
  try {
    const userId = req.user.id; // User ID from the authentication middleware
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    // Update the item quantity
    cart.items[itemIndex].quantity = quantity;

    // Recalculate the total price
    let totalPrice = 0;
    for (let item of cart.items) {
      const product = await Product.findById(item.product);
      if (product) {
        totalPrice += product.price * item.quantity;
      }
    }

    cart.totalPrice = totalPrice;

    // Save the updated cart
    await cart.save();

    return res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete entire cart
export const deleteCart = async (req, res) => {
  try {
    const userId = req.user.id; // User ID from the authentication middleware

    const cart = await Cart.findOneAndDelete({ userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    return res.status(200).json({ success: true, message: 'Cart deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
