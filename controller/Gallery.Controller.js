const { cloudinary } = require("../config/cloudinary");
const Gallery = require("../models/Gallery.model");

// Allowed categories based on updated schema
const allowedCategories = [
  "All Images",
  "Works",
  "Meetings",
  "Celebrations",
  "Our Success",
  "Our Branches",
];

// Create a new gallery item
const createGallery = async (req, res) => {
  try {
    const { image, category } = req.body;

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    if (!category || !allowedCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid or missing category" });
    }

    // Upload image to Cloudinary if it's base64
    let imageUrl = image;
    if (image.startsWith("data:")) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "gallery",
      });
      imageUrl = result.secure_url;
    }

    const newGalleryItem = new Gallery({ image: imageUrl, category });
    await newGalleryItem.save();

    res.status(201).json({
      message: "Gallery item created successfully",
      item: newGalleryItem,
    });
  } catch (error) {
    console.error("Error in createGallery:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all gallery items
const getAllGalleryItems = async (req, res) => {
  try {
    const galleryItems = await Gallery.find().sort({ _id: -1 });

    if (!galleryItems.length) {
      return res.status(404).json({ message: "No gallery items found" });
    }

    res.status(200).json(galleryItems);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a gallery item by ID
const getGalleryById = async (req, res) => {
  try {
    const { id } = req.params;
    const galleryItem = await Gallery.findById(id);

    if (!galleryItem) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    res.status(200).json(galleryItem);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a gallery item
const updateGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, category } = req.body;

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    if (!category || !allowedCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid or missing category" });
    }

    // Upload new image if it's base64
    let imageUrl = image;
    if (image.startsWith("data:")) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "gallery",
      });
      imageUrl = result.secure_url;
    }

    const updatedGalleryItem = await Gallery.findByIdAndUpdate(
      id,
      { image: imageUrl, category },
      { new: true }
    );

    if (!updatedGalleryItem) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    res.status(200).json({
      message: "Gallery item updated successfully",
      item: updatedGalleryItem,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a gallery item
const deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGalleryItem = await Gallery.findByIdAndDelete(id);

    if (!deletedGalleryItem) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    res.status(200).json({ message: "Gallery item deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createGallery,
  getAllGalleryItems,
  getGalleryById,
  updateGallery,
  deleteGallery,
};
