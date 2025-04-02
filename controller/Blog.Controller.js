const Blog = require("../models/Blog.model");

// **Create a New Blog Post**
const createBlog = async (req, res) => {
  try {
    const { title, image, description, author } = req.body;

    // Check if a blog post with the same title already exists
    const existingBlog = await Blog.findOne({ title });
    if (existingBlog) {
      return res.status(400).json({ message: "Blog post with this title already exists" });
    }

    // Create new blog post
    const newBlog = new Blog({ title, image, description, author });
    await newBlog.save();

    res.status(201).json({ message: "Blog post created successfully", blog: newBlog });
  } catch (error) {
    console.error("Error in createBlog:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Get All Blog Posts**
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    if (!blogs.length) {
      return res.status(404).json({ message: "No blog posts found" });
    }
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createBlog, getAllBlogs };
