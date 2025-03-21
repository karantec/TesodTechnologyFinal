const express = require('express');
const { createContact, getAllContacts, updateContact, deleteContact } = require('../controller/Contact.controller');
const router = express.Router();

// **Routes**
router.post('/create', createContact);
router.get('/', getAllContacts);
router.put('/update/:id', updateContact);
router.delete('/delete/:id', deleteContact);

module.exports = router;
