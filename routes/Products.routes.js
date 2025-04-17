const express = require("express");
const router = express.Router(); 
const {createProducts,getAllProducts,getProductByIds,updateProducts,deleteProducts}=require('../controller/Product.Controller')

// CREATE
router.post("/create", createProducts);

// READ ALL
router.get("/", getAllProducts);

// READ ONE
router.get("/:id", getProductByIds);

// UPDATE
router.put("/:id", updateProducts);

// DELETE
router.delete("/:id", deleteProducts);

module.exports = router;
