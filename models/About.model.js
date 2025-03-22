const mongoose = require('mongoose');

const aboutUsSchema = new mongoose.Schema({
    title: { type: String, required: true },         // For "DATA DRIVEN"
    description: { type: String, required: true },   // Main body content
    image: { type: String, required: true } ,
    linkedin:{type:String},
    facebook:{type:String} ,
    Instagram:{type:String},
    twitter:{type:String}
}, { timestamps: true });

module.exports = mongoose.model('AboutUs', aboutUsSchema);
