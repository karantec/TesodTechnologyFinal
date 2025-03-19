const { cloudinary } = require("../config/cloudinary");
const Job = require("../models/Job.model");

// **Create a New Job Post**
const createJob = async (req, res) => {
  try {
    const { jobTitle, employmentType, keySkills, keyResponsibilities, applyLink } = req.body;

    // Check if a job with the same title already exists
    const existingJob = await Job.findOne({ jobTitle });

    if (existingJob) {
      return res.status(400).json({ message: "Job already exists" });
    }

    // Create new job
    const newJob = new Job({ jobTitle, employmentType, keySkills, keyResponsibilities, applyLink });
    await newJob.save();

    res.status(201).json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    console.error("Error in createJob:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Get All Jobs**
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();

    if (!jobs.length) {
      return res.status(404).json({ message: "No job posts found" });
    }

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Get Single Job by ID**
const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job post not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Update Job Post**
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { jobTitle, employmentType, keySkills, keyResponsibilities, applyLink } = req.body;

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { jobTitle, employmentType, keySkills, keyResponsibilities, applyLink, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job post not found" });
    }

    res.status(200).json({ message: "Job post updated successfully", job: updatedJob });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Delete a Job Post**
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job post not found" });
    }

    res.status(200).json({ message: "Job post deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createJob, getAllJobs, getJobById, updateJob, deleteJob };
