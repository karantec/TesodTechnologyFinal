const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Blog post title
  image: { type: String, required: true }, // Blog cover image URL
  description: { type: String, required: true }, // Blog post content
  author: { type: String }, // Blog author name
  createdAt: { type: Date, default: Date.now }, // Date of publication
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
