const express = require("express");
const router = express.Router();
const {
  createGallery,
  getAllGalleryItems,
  getGalleryById,
  updateGallery,
  deleteGallery,
} = require("../controller/Gallery.Controller");
// Create a new gallery item
router.post("/", createGallery);

// Get all gallery items
router.get("/", getAllGalleryItems);

// Get a gallery item by ID
router.get("/:id", getGalleryById);

// Update a gallery item
router.put("/:id", updateGallery);

// Delete a gallery item
router.delete("/:id", deleteGallery);

module.exports = router;
