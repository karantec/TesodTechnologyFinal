const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: true
    },
    
    category: {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
