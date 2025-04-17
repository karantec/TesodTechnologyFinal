
const Product = require("../models/Product.model"); // Make sure to import your model

const createProducts = async (req, res) => {
  try {
    const { name, image, description, category } = req.body;

    // Optional: Check if a blog with the same name already exists
    const existingBlog = await Product.findOne({ name });
    if (existingBlog) {
      return res.status(400).json({ message: "Blog post with this name already exists" });
    }

    // Create new blog
    const newBlog = new Product({ name, image, description, category });
    await newBlog.save();

    res.status(201).json({ message: "Blog post created successfully", blog: newBlog });
  } catch (error) {
    console.error("Error in createBlog:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// **Get All Blog Posts**
const getAllProducts = async (req, res) => {
  try {
    const blogs = await Product.find();
    if (!blogs.length) {
      return res.status(404).json({ message: "No blog posts found" });
    }
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Get a Single Blog Post by ID**
const getProductByIds = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Product.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Update a Blog Post**
const updateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, description, category } = req.body;

    const updatedBlog = await Product.findByIdAndUpdate(
      id,
      { name, image, description, category },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.status(200).json({ message: "Blog post updated successfully", blog: updatedBlog });
  } catch (error) {
    console.error("Error in updateBlog:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Delete a Blog Post**
const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Product.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createProducts, getAllProducts, getProductByIds, updateProducts, deleteProducts };
