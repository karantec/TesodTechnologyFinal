const express = require('express');

const { upload } = require('../config/cloudinary'); 
const { createGallery, getAllProducts, getGalleryById, updateGallery, deleteGallery } = require('../controller/Gallery.Controller');


const router = express.Router();
const cpUpload = upload.fields([
    { name: 'images', maxCount: 5 }
  ]);
// **Routes**
router.post('/creatGallery', cpUpload,createGallery);
router.get('/Gallery', getAllProducts);
router.get("/:id", getGalleryById); 
router.put("/:id", updateGallery);
router.delete("/:id", deleteGallery);


module.exports = router;
