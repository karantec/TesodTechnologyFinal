const express = require('express');
const { createJob, getAllJobs } = require('../controller/Job.Controller');


const router = express.Router();

router.post('/createJob', createJob);
router.get('/job', getAllJobs);


module.exports = router;
