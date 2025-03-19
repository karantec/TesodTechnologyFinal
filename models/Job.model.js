const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true
  },
  employmentType: {
    type: String,
    enum: ["Remote", "Onsite", "Hybrid"],
    required: true
  },
  keySkills: {
    type: [String],
    required: true
  },
  keyResponsibilities: {
    type: [String],
    required: true
  },
  applyLink: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
