const express = require("express");
const { createService, getAllServices, updateService, deleteService } = require("../controller/Service.Controller");
const router = express.Router();

// **Create a New Service**
router.post("/createService", createService);

// **Get All Services**
router.get("/", getAllServices);

// **Update a Service**
router.put("/:id", updateService);

// **Delete a Service**
router.delete("/:id", deleteService);

module.exports = router;
