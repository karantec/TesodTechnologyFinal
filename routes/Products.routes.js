const express = require('express');

const { upload } = require('../config/cloudinary'); 
const { createProduct, getAllProducts } = require('../controller/Product.Controller');

const router = express.Router();
const cpUpload = upload.fields([
    { name: 'images', maxCount: 5 }
  ]);
// **Routes**
router.post('/creatProducts', cpUpload,createProduct);
router.get('/Product', getAllProducts);


module.exports = router;
