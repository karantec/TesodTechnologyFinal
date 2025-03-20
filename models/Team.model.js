const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    photo: { type: String, required: true }, // Store URL of image
    category: { type: String,  },
 
});

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

module.exports = TeamMember;
