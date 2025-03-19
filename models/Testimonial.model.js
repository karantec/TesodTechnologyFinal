const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the person
    position: { type: String, required: true }, // Position (e.g., Founder & CEO)
    organization: { type: String, required: true }, // Organization name
    photo: { type: String, required: true }, // Image URL
    message: { type: String, required: true }, // Testimonial text
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
 
module.exports = Testimonial;
