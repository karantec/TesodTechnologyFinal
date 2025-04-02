const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    title: { type: String, required: true }, // Product Name (e.g., Restaurant Management System)
    image: { type: String, required: true }, // Image URL
    description: { type: String, required: true } // Short description of the product
});

const Gallery = mongoose.model('Gallery', GallerySchema);

module.exports = Gallery;
