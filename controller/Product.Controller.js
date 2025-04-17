const Product = require("../models/Product.model"); // Ensure model is imported
const archiver = require("archiver");
const fs = require("fs");
const path = require("path");

// **Create Product**
const createProducts = async (req, res) => {
  try {
    const { name, image, description, category } = req.body;

    // Optional: Check if a product with the same name already exists
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ message: "Product with this name already exists" });
    }

    // Create new product
    const newProduct = new Product({ name, image, description, category });
    await newProduct.save();

    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error("Error in createProduct:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Get All Products**
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products.length) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Get a Single Product by ID**
const getProductByIds = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Update a Product**
const updateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, description, category } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, image, description, category },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error in updateProduct:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Delete a Product**
const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Download Products as ZIP**
const downloadProductsAsZip = async (req, res) => {
  try {
    const products = await Product.find();

    if (!products.length) {
      return res.status(404).json({ message: "No products found" });
    }

    // Set zip file name
    const zipFileName = `products_${Date.now()}.zip`;
    const zipFilePath = path.join(__dirname, "..", "temp", zipFileName);

    // Ensure temp folder exists
    const tempDir = path.join(__dirname, "..", "temp");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    // Create a file to stream archive data
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    // Handle events
    output.on("close", () => {
      res.download(zipFilePath, zipFileName, (err) => {
        if (err) console.error("Download error:", err);
        fs.unlinkSync(zipFilePath); // Clean up after download
      });
    });

    archive.on("error", (err) => {
      throw err;
    });

    // Pipe archive data to the file
    archive.pipe(output);

    // Add product data as separate JSON files or one combined file
    products.forEach((product, index) => {
      const content = JSON.stringify(product, null, 2);
      archive.append(content, { name: `product_${index + 1}.json` });
    });

    // Finalize the archive
    archive.finalize();
  } catch (error) {
    console.error("Error in downloadProductsAsZip:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createProducts,
  getAllProducts,
  getProductByIds,
  updateProducts,
  deleteProducts,
  downloadProductsAsZip,
};
