const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true }, // Code file name
  fileUrl: { type: String, required: true }, // Cloudinary URL
  imageDescription: { type: String, required: true }, // Image description
  createdAt: { type: Date, default: Date.now } // Timestamp
});

module.exports = mongoose.model("File", fileSchema);
