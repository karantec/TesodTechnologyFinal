const { cloudinary } = require("../config/cloudinary");
const Gallery = require("../models/Gallery.model");


// **Create a New Blog Post with Image Upload**
const createGallery = async (req, res) => {
  try {
    const { title, image,description } = req.body;

    // Check if a team member with the same name & position already exists
    const existingProduct = await Gallery.findOne({ title });

    if (existingProduct) {
      return res.status(400).json({ message: "Team member already exists" });
    }

    // Create new team member
    const newProduct = new Gallery({title, image,description });
    await newProduct.save();

    res.status(201).json({ message: "Gallery created successfully", product: newProduct });
  } catch (error) {
    console.error("Error in createTeam:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const Products = await Gallery.find();

    if (!Products.length) {
      return res.status(404).json({ message: "No Product posts found" });
    }

    res.status(200).json(Products);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const getGalleryById = async (req, res) => {
  try {
    const { id } = req.params;
    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({ message: "Gallery post not found" });
    }

    res.status(200).json(gallery);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Update Gallery Post**
const updateGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image, description } = req.body;

    let imageUrl = image;

    // Upload new image if provided
    if (image) {
      const result = await cloudinary.uploader.upload(image, { folder: "gallery" });
      imageUrl = result.secure_url;
    }

    const updatedGallery = await Gallery.findByIdAndUpdate(
      id,
      { title, image: imageUrl, description, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedGallery) {
      return res.status(404).json({ message: "Gallery post not found" });
    }

    res.status(200).json({ message: "Gallery post updated successfully", gallery: updatedGallery });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Delete a Gallery Post**
const deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGallery = await Gallery.findByIdAndDelete(id);

    if (!deletedGallery) {
      return res.status(404).json({ message: "Gallery post not found" });
    }

    res.status(200).json({ message: "Gallery post deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createGallery, getAllProducts, getGalleryById, updateGallery, deleteGallery };
