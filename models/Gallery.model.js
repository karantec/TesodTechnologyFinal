const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
  image: { type: String, required: true }, // Image URL
  category: {
    type: String,
    required: true,
    enum: [
      "Apps",
      "Website",
      "Softwares",
      "Logo",
      "GoogleAds",
      "InstaAds",
      "Facebook ads",
      "Seo",
      "Other digital marketing services",
    ],
  },
});

const Gallery = mongoose.model("Gallery", GallerySchema);

module.exports = Gallery;
