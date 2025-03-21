const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  projectDetails: {
    type: String,
    required: false,
    maxlength: 1000
  },
  attachment: {
    type: String, // URL to the uploaded file (e.g., Cloudinary link)
   
  },
}, { timestamps: true });

module.exports = mongoose.model("Contact", ContactSchema);
