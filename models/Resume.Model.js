const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: false // Optional field
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  position: {
    type: String,
    required: true
  },
  resumeLink: {
    type: String,
    required: true
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

module.exports = JobApplication;
