const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
  image: { type: String, required: true }, // Image URL
});

const Gallery = mongoose.model("Gallery", GallerySchema);

module.exports = Gallery;
