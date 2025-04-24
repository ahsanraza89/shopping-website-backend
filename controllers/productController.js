import Products from "../models/Products.js";

export const createProduct = async (req, res) => {
  try {
    const { title, price, description } = req.body;
    const newProduct = new Products({
      title,
      price,
      description,
    });
    await newProduct.save();
    res.status(200).json({ message: "Product created", product: newProduct });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error creating product", error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json({ message: "Products retrieved", products });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving products", error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Single product retrieved", product });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving product",
      error: error.message,
    });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted", product });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting product",
      error: error.message,
    });
  }
};
