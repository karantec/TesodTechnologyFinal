const express = require('express');

const { upload } = require('../config/cloudinary'); 
const { createBlog, getAllBlogs } = require('../controller/Blog.Controller');

const router = express.Router();
const cpUpload = upload.fields([
    { name: 'image', maxCount: 6 }
]);

// **Routes**
router.post('/createBlog', cpUpload, createBlog);
router.get('/blogs', getAllBlogs);

module.exports = router;
