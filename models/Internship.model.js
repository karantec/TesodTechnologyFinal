const mongoose = require('mongoose');

const InternshipSchema = new mongoose.Schema({
    fullName: { type: String, required: true }, // User's full name
    email: { type: String, required: true }, // User's email address
    phone: { type: String, required: true }, // User's phone number
    college: { type: String, required: true }, // User's college name
    degree: { type: String, required: true }, // User's degree
    startDate: { type: String, required: true }, // Internship start date
    endDate: { type: String, required: true }, // Internship end date
    internshipDomain: { type: String, required: true }, // Internship domain
    projectTitle: { type: String, required: true }, // Project title during the internship
    skillsGained: { type: [String], required: true }, // List of skills gained during the internship
    createdAt: { type: Date, default: Date.now } // Timestamp of record creation
});

const Internship = mongoose.model('Internship', InternshipSchema);

module.exports = Internship;
