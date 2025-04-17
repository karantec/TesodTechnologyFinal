const { cloudinary } = require("../config/cloudinary");
const Brand = require("../models/Partnership.models");

// **Create a New Product with Image Upload**
const createPartnerhsip = async (req, res) => {
  try {
    const { name, logoUrl } = req.body;

    // Check if the product already exists
    const existingProduct = await Brand.findOne({ name });

    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }

    // Create new product
    const newBrand = new Brand({ name, logoUrl });
    await newBrand.save();

    res.status(201).json({ message: "Product created successfully", product: newBrand });
  } catch (error) {
    console.error("Error in createProduct:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Get All Products**
const getAllPartnership = async (req, res) => {
  try {
    const products = await Brand.find();

    if (!products.length) {
      return res.status(404).json({ message: "No product posts found" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Get Product by ID**
const getPartnershipById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Brand.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error in getProductById:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Update Product**
const updatePartnership = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, logoUrl } = req.body;
  
      let imageUrl = logoUrl; // Default to provided logo URL
  
      // Upload new image if provided
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, { folder: "products" });
        imageUrl = result.secure_url;
      }
  
      const updatedProduct = await Brand.findByIdAndUpdate(
        id,
        { name, logoUrl: imageUrl, updatedAt: Date.now() },
        { new: true }
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
      console.error("Error in updateProduct:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  

// **Delete a Product**
const deletePartnership = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Brand.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in deleteProduct:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createPartnerhsip, getAllPartnership , getPartnershipById, updatePartnership, deletePartnership };
