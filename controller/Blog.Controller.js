const Blog = require("../models/Blog.model");
// **Create a New Blog Post**
const createBlog = async (req, res) => {
  try {
    const { title, image, description } = req.body;

    const existingBlog = await Blog.findOne({ title });
    if (existingBlog) {
      return res
        .status(400)
        .json({ message: "Blog post with this title already exists" });
    }

    const newBlog = new Blog({ title, image, description });
    await newBlog.save();

    res
      .status(201)
      .json({ message: "Blog post created successfully", blog: newBlog });
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

// **Get a Single Blog Post by ID**
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
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
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image, description } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, image, description },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res
      .status(200)
      .json({ message: "Blog post updated successfully", blog: updatedBlog });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Delete a Blog Post**
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
