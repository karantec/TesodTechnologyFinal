const express = require("express");
const { createAbout, getAllAbout, updateAbout, deleteAbout } = require("../controller/About.Controller");
const router = express.Router();

// **Create a New About Section**
router.post("/createAbout", createAbout);

// **Get All About Sections**
router.get("/getAbout", getAllAbout);

// **Update an About Section by ID**
router.put("/:id", updateAbout);

// **Delete an About Section by ID**
router.delete("/:id", deleteAbout);

module.exports = router;
