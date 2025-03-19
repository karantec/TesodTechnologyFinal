const { cloudinary } = require("../config/cloudinary");
const Testimonial = require("../models/Testimonial.model");

// **Create a New Testimonial**
const createTestimonial = async (req, res) => {
  try {
    const { name, position, organization, photo, message } = req.body;

    // Check if a testimonial with the same name exists
    const existingMember = await Testimonial.findOne({ name });

    if (existingMember) {
      return res.status(400).json({ message: "Testimonial member already exists" });
    }

    // Create new testimonial
    const newTestimonial = new Testimonial({ name, position, organization, photo, message });
    await newTestimonial.save();

    res.status(201).json({ message: "Testimonial created successfully", testimonial: newTestimonial });
  } catch (error) {
    console.error("Error in createTestimonial:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Get All Testimonials**
const getAllTestimonial = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();

    if (!testimonials.length) {
      return res.status(404).json({ message: "No testimonials found" });
    }

    res.status(200).json(testimonials);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Get Single Testimonial by ID**
const getTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.status(200).json(testimonial);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Update Testimonial**
const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, organization, photo, message } = req.body;

    let updatedData = { name, position, organization, message };

    // Handle image upload if a new image is provided
    if (photo) {
      const result = await cloudinary.uploader.upload(photo, { folder: "testimonials" });
      updatedData.photo = result.secure_url;
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedTestimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.status(200).json({ message: "Testimonial updated successfully", updatedTestimonial });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Delete Testimonial**
const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.status(200).json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createTestimonial, getAllTestimonial, getTestimonialById, updateTestimonial, deleteTestimonial };
