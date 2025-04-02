const express = require('express');

const { upload } = require('../config/cloudinary'); 
const { createGallery, getAllProducts } = require('../controller/Gallery.Controller');


const router = express.Router();
const cpUpload = upload.fields([
    { name: 'images', maxCount: 5 }
  ]);
// **Routes**
router.post('/creatGallery', cpUpload,createGallery);
router.get('/Gallery', getAllProducts);
// router.get("/:id", getProductById); // Get a single testimonial by ID
// router.put("/:id", updateProduct);
// router.delete("/:id", deleteProduct);


module.exports = router;
