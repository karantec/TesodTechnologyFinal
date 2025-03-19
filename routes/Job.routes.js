const express = require('express');
const { createJob, getAllJobs, getJobById, updateJob, deleteJob } = require('../controller/Job.Controller');


const router = express.Router();

router.post('/createJob', createJob);
router.get('/job', getAllJobs);
router.get("/:id", getJobById); // Get a single job post by ID
router.put("/:id", updateJob); // Update a job post
router.delete("/:id", deleteJob);

module.exports = router;
