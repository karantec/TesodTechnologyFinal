const express = require('express');

const { upload } = require('../config/cloudinary'); 
const { createProduct, getAllProducts,getProductById, updateProduct, deleteProduct  } = require('../controller/Product.Controller');

const router = express.Router();
const cpUpload = upload.fields([
    { name: 'images', maxCount: 5 }
  ]);
// **Routes**
router.post('/creatProducts', cpUpload,createProduct);
router.get('/Product', getAllProducts);
router.get("/:id", getProductById); // Get a single testimonial by ID
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);


module.exports = router;
