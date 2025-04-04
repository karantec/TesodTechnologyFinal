const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Product Name (e.g., Restaurant Management System)
    category: { type: String, required: true }, // Category (e.g., Our Software, Business, etc.)
    file: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true } // Short description of the product
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
