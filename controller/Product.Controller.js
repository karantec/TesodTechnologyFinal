const { cloudinary } = require("../config/cloudinary");
const Product = require("../models/Product.model");
// const path = require("path");
// const fs = require("fs");

// **Create a New Blog Post with Image Upload**
const createProduct = async (req, res) => {
  try {
    const { name, category, description,file,image } = req.body;
    // let imageUrl = "";
    // let fileUrl = "";
    
    // // Handle file uploads using multer + cloudinary
    // if (req.files) {
    //   // If there's an image file
    //   if (req.files.image) {
    //     const imageResult = await cloudinary.uploader.upload(req.files.image[0].path, {
    //       folder: "products/images"
    //     });
    //     imageUrl = imageResult.secure_url;
    //     // Delete temporary file
    //     fs.unlinkSync(req.files.image[0].path);
    //   }
      
      // If there's an HTML file
    //   if (req.files.file) {
    //     // Special handling for HTML files
    //     const fileResult = await cloudinary.uploader.upload(req.files.file[0].path, {
    //       folder: "products/files",
    //       resource_type: "raw" // Important for non-image files
    //     });
    //     fileUrl = fileResult.secure_url;
    //     // Delete temporary file
    //     fs.unlinkSync(req.files.file[0].path);
    //   }
    // }
    
    // Create the new product
    const newProduct = new Product({
      name,
      category,
      description,
      file,image // Store the Cloudinary URL to the HTML file
    });
    
    await newProduct.save();
    
    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error("Error in createProduct:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const Products = await Product.find();

    if (!Products.length) {
      return res.status(404).json({ message: "No Product posts found" });
    }

    res.status(200).json(Products);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// Download a product file as HTML
const downloadProductFile = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the product by ID
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    // Check if file URL exists
    if (!product.file) {
      return res.status(400).json({ message: "No file available for this product" });
    }
    
    // Redirect to the Cloudinary URL or fetch and serve the file
    // Option 1: Simple redirect (easier but less control)
    // return res.redirect(product.file);
    
    // Option 2: Fetch and serve (more control over headers and download experience)
    const axios = require('axios');
    const response = await axios({
      method: 'get',
      url: product.file,
      responseType: 'stream'
    });
    
    // Set file name for download
    res.setHeader('Content-Disposition', `attachment; filename="${product.name.replace(/\s+/g, '-')}.html"`);
    res.setHeader('Content-Type', 'text/html');
    
    // Pipe the response stream to the client
    response.data.pipe(res);
  } catch (error) {
    console.error("Error in downloadProductFile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// Get downloadable products list (optional utility function)
const getDownloadableProducts = async (req, res) => {
  try {
    // Find products that have files available
    const products = await Product.find({ file: { $exists: true, $ne: "" } })
      .select('name category image description');
    
    if (!products.length) {
      return res.status(404).json({ message: "No downloadable products found" });
    }
    
    res.status(200).json(products);
  } catch (error) {
    console.error("Error in getDownloadableProducts:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// **Update Product**
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, file, image, description, } = req.body;

    let imageUrl = "";
    let fileUrl="";
    // Upload new image if provided
    if (image) {
      const result = await cloudinary.uploader.upload(image, { folder: "products" });
      imageUrl = result.secure_url;
    }
    if (file) {
      const result = await cloudinary.uploader.upload(image, { folder: "products" });
      fileUrl = result.secure_url;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, category, image: imageUrl, description,fileUrl, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Delete a Product**
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = { createProduct, getAllProducts,getProductById, getDownloadableProducts,downloadProductFile,updateProduct, deleteProduct };
