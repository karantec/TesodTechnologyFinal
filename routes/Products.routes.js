const express = require('express');
const router = express.Router();
const { upload } = require('../config/upload'); // <-- local multer config
const { createProduct, getAllProducts, getProductById, getDownloadableProducts, updateProduct, deleteProduct, downloadProductFile} = require('../controller/Product.Controller');

const cpUpload = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'file', maxCount: 1 }
]);

router.post('/create', cpUpload, createProduct);
router.get('/Product', getAllProducts);
router.get("/:id", getProductById);
router.get('/product/download/:id', downloadProductFile)
router.get('/downloadable/list', getDownloadableProducts);
router.put('/:id', cpUpload, updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
