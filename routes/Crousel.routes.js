const express = require("express");
const { createCarouselItem, getAllCarouselItems, getCarouselItemById, updateCarouselItem, deleteCarouselItem } = require("../controller/Crousel.Controller");
const router = express.Router();

// Create a new carousel item
router.post("/create", createCarouselItem);

// Get all carousel items
router.get("/", getAllCarouselItems);

// Get a single carousel item by ID
router.get("/:id", getCarouselItemById);

// Update a carousel item by ID
router.put("/:id", updateCarouselItem);

// Delete a carousel item by ID
router.delete("/:id", deleteCarouselItem);

module.exports = router;
