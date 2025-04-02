const express = require('express');
const { createCallbackRequest, getAllCallbackRequests } = require('../controller/Callback.Controller');


const router = express.Router();

// **Routes**
router.post('/request-callback', createCallbackRequest);
router.get('/callback-requests', getAllCallbackRequests);

module.exports = router;
