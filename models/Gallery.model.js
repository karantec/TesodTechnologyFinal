const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
  image: {
    type: String,
    required: true, // URL or path to the image
  },
  category: {
    type: String,
    required: true,
    enum: [
      "All Images",
      "Works",
      "Meetings",
      "Celebrations",
      "Our Success",
      "Our Branches",
    ],
  },
});

const Gallery = mongoose.model("Gallery", GallerySchema);

module.exports = Gallery;
