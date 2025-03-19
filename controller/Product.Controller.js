const { cloudinary } = require("../config/cloudinary");
const Product = require("../models/Product.model");

// **Create a New Blog Post with Image Upload**
const createProduct = async (req, res) => {
  try {
    const { name, category,image,description } = req.body;

    // Check if a team member with the same name & position already exists
    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      return res.status(400).json({ message: "Team member already exists" });
    }

    // Create new team member
    const newProduct = new Product({name, category,image,description });
    await newProduct.save();

    res.status(201).json({ message: "product created successfully", product: newProduct });
  } catch (error) {
    console.error("Error in createTeam:", error);
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

// **Get Single Blog Post by ID**
// const getBlogById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const blog = await Blog.findById(id);

//     if (!blog) {
//       return res.status(404).json({ message: "Blog post not found" });
//     }

//     res.status(200).json(blog);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// **Update Blog Post with Image Upload**
// const updateBlog = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, content, tags, isPublished, image } = req.body;
//     let imageUrl = '';

//     if (image) {
//       const result = await cloudinary.uploader.upload(image, { folder: "blogs" });
//       imageUrl = result.secure_url; 
//     }

//     const updatedBlog = await Blog.findByIdAndUpdate(
//       id,
//       { title, content, tags, isPublished, image: imageUrl, updatedAt: Date.now() },
//       { new: true }
//     );

//     if (!updatedBlog) {
//       return res.status(404).json({ message: "Blog post not found" });
//     }

//     res.status(200).json({ message: "Blog post updated successfully", updatedBlog });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// **Delete a Blog Post**
// const deleteBlog = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedBlog = await Blog.findByIdAndDelete(id);

//     if (!deletedBlog) {
//       return res.status(404).json({ message: "Blog post not found" });
//     }

//     res.status(200).json({ message: "Blog post deleted successfully" });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

module.exports = { createProduct, getAllProducts };
