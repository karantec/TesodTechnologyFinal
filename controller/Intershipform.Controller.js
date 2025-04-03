const Internship = require("../models/Internship.model");

// **Create a New Internship Entry**
const createInternship = async (req, res) => {
  try {
    const { fullName, email, phone, college, degree, startDate, endDate, internshipDomain, projectTitle, skillsGained } = req.body;

    // Create new internship entry
    const newInternship = new Internship({
      fullName,
      email,
      phone,
      college,
      degree,
      startDate,
      endDate,
      internshipDomain,
      projectTitle,
      skillsGained
    });

    await newInternship.save();

    res.status(201).json({ message: "Internship entry created successfully", internship: newInternship });
  } catch (error) {
    console.error("Error in createInternship:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Get All Internship Entries**
const getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.find();
    if (!internships.length) {
      return res.status(404).json({ message: "No internship entries found" });
    }
    res.status(200).json(internships);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createInternship, getAllInternships };
