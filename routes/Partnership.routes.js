const express = require('express');
const { createPartnerhsip, getAllPartnership, updatePartnership, deletePartnership, getPartnershipById } = require('../controller/Partnership.Controller');

const router = express.Router();

// Create a new product
router.post('/createBrand', createPartnerhsip);

// Get all products
router.get('/', getAllPartnership);

// Get product by ID
router.get('/:id', getPartnershipById);

// Update product by ID
router.put('/update/:id', updatePartnership);

// Delete product by ID
router.delete('/delete/:id', deletePartnership);

module.exports = router;
