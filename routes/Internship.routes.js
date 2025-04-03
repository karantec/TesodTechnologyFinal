const express = require('express');
const { createInternship, getAllInternships } = require('../controller/Intershipform.Controller');

const router = express.Router();

// **Routes**
router.post('/create-internship', createInternship);
router.get('/internships', getAllInternships);

module.exports = router;
