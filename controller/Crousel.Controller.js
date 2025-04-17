const CarouselItem = require("../models/Crousel.model");

// **Create a New Carousel Item**
const createCarouselItem = async (req, res) => {
  try {
    const { title, image, description } = req.body;

    const existingItem = await CarouselItem.findOne({ title });
    if (existingItem) {
      return res.status(400).json({ message: "Carousel item with this title already exists" });
    }

    const newItem = new CarouselItem({ title, image, description });
    await newItem.save();

    res.status(201).json({ message: "Carousel item created successfully", item: newItem });
  } catch (error) {
    console.error("Error in createCarouselItem:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Get All Carousel Items**
const getAllCarouselItems = async (req, res) => {
  try {
    const items = await CarouselItem.find();
    if (!items.length) {
      return res.status(404).json({ message: "No carousel items found" });
    }
    res.status(200).json(items);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Get a Single Carousel Item by ID**
const getCarouselItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await CarouselItem.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Carousel item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Update a Carousel Item**
const updateCarouselItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image, description } = req.body;

    const updatedItem = await CarouselItem.findByIdAndUpdate(
      id,
      { title, image, description },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Carousel item not found" });
    }

    res.status(200).json({ message: "Carousel item updated successfully", item: updatedItem });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Delete a Carousel Item**
const deleteCarouselItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await CarouselItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Carousel item not found" });
    }

    res.status(200).json({ message: "Carousel item deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createCarouselItem,
  getAllCarouselItems,
  getCarouselItemById,
  updateCarouselItem,
  deleteCarouselItem
};
