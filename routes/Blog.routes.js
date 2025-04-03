const express = require("express");
const router = express.Router();
const {createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog} = require("../controller/Blog.Controller");
// Routes for Blog
router.post("/create", createBlog); // Create a new blog post
router.get("/get", getAllBlogs); // Get all blog posts
router.get("/:id", getBlogById); // Get a single blog post by ID
router.put("/:id", updateBlog); // Update a blog post
router.delete("/:id", deleteBlog); // Delete a blog post

module.exports = router;