const express = require('express');

const { upload } = require('../config/cloudinary'); 
const { createTestimonial, getAllTestimonial } = require('../controller/Testimonial.Controller');

const router = express.Router();
const cpUpload = upload.fields([
    { name: 'images', maxCount: 5 }
  ]);
router.post('/createTestimonail', cpUpload,createTestimonial);
router.get('/Testimonial', getAllTestimonial);


module.exports = router;
