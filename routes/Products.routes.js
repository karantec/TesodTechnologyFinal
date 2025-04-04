const express = require('express');
const router = express.Router(); 
const { upload } = require('../config/cloudinary'); 
const { createProduct, getAllProducts,getProductById, updateProduct, deleteProduct  } = require('../controller/Product.Controller');

const cpUpload = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'file', maxCount: 1 }
]);
router.post('/creatProducts', cpUpload,createProduct);
router.get('/Product', getAllProducts);
router.get("/:id", getProductById); // Get a single testimonial by ID
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);


module.exports = router;
