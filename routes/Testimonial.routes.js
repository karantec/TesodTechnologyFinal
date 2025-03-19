const express = require('express');
const { upload } = require('../config/cloudinary'); 
const { createTestimonial, getAllTestimonial, getTestimonialById, updateTestimonial, deleteTestimonial } = require('../controller/Testimonial.Controller');

const router = express.Router();
const cpUpload = upload.fields([
    { name: 'images', maxCount: 5 }
  ]);
router.post('/createTestimonail', cpUpload,createTestimonial);
router.get('/Testimonial', getAllTestimonial);

router.get("/:id", getTestimonialById); // Get a single testimonial by ID
router.put("/:id", updateTestimonial); // Update a testimonial
router.delete("/:id", deleteTestimonial); 

module.exports = router;
