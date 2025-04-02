const mongoose = require('mongoose');

const CallbackRequestSchema = new mongoose.Schema({
    fullName: { type: String, required: true }, // User's full name
    email: { type: String, required: true }, // User's email address
    phoneNumber: { type: String, required: true }, // User's phone number
    preferredDate: { type: String, required: true }, // Preferred callback date (string for flexibility)
    preferredTime: { type: String, required: true }, // Preferred callback time
    message: { type: String, default: '' }, // Optional message
    createdAt: { type: Date, default: Date.now } // Timestamp of request
});

const CallbackRequest = mongoose.model('CallbackRequest', CallbackRequestSchema);

module.exports = CallbackRequest;
