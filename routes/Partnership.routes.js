const express = require('express');
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controller/Partnership.Controller');
const router = express.Router();

// Create a new product
router.post('/createBrand', createProduct);

// Get all products
router.get('/', getAllProducts);

// Get product by ID
router.get('/:id', getProductById);

// Update product by ID
router.put('/update/:id', updateProduct);

// Delete product by ID
router.delete('/delete/:id', deleteProduct);

module.exports = router;
