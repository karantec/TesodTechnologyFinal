const express = require('express');
const { userLogin, createCourse, getCoursesByUserAndMonth } = require('../controller/courseController');

const router = express.Router();

router.post('/login', userLogin);
router.post('/courses', createCourse);
router.get('/courses', getCoursesByUserAndMonth);

module.exports = router;
