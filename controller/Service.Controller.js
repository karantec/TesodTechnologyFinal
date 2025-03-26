const { cloudinary } = require("../config/cloudinary");
const Service = require("../models/Service.model");

// **Create a New Service with Image Upload**
const createService = async (req, res) => {
    try {
        const { title, description, image, } = req.body;

        // Check if the service with the same title already exists
        const existingService = await Service.findOne({ title });

        if (existingService) {
            return res.status(400).json({ message: "Service already exists" });
        }

        // Upload image to Cloudinary (if image is provided)
 

        // Create a new Service
        const newService = new Service({ 
            title, 
            description, 
           image,
            
        });

        await newService.save();

        res.status(201).json({ message: "Service created successfully", service: newService });
    } catch (error) {
        console.error("Error in createService:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// **Get All Services**
const getAllServices = async (req, res) => {
    try {
        const services = await Service.find();

        if (!services.length) {
            return res.status(404).json({ message: "No services found" });
        }

        res.status(200).json(services);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// **Update Service**
const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image,  } = req.body;

        let imageUrl = image;

        // Upload new image if provided
        if (image) {
            const result = await cloudinary.uploader.upload(image, { folder: "services" });
            imageUrl = result.secure_url;
        }

        // Update Service with new data
        const updatedService = await Service.findByIdAndUpdate(
            id,
            { 
                title, 
                description, 
                image: imageUrl ,
                category,
                updatedAt: Date.now() // Optional: If you want to track updates
            },
            { new: true }
        );

        if (!updatedService) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.status(200).json({ message: "Service updated successfully", service: updatedService });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// **Delete Service**
const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedService = await Service.findByIdAndDelete(id);

        if (!deletedService) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { createService, getAllServices, updateService, deleteService };
