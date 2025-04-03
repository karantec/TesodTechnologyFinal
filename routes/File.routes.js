const express = require("express");
const { uploadFile, getAllFiles } = require("../controller/File.Controller");

const router = express.Router();

// Route for uploading a file
router.post("/upload", uploadFile);

// Route for getting all uploaded files
router.get("/files", getAllFiles);

module.exports = router;
