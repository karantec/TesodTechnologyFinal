const express = require('express');
const { createResume, getAllResume } = require('../controller/JobSending.Controller');


const router = express.Router();

// **Routes**
router.post('/create',createResume);
router.get('/resume', getAllResume);


module.exports = router;
