
const Product = require("../models/Product.model");


const createProduct = async (req, res) => {
  try {
    const { name, category, description } = req.body;
    const image = req.files?.image?.[0]?.path;
    const file = req.files?.file?.[0]?.path;

    if (!image || !file) {
      return res.status(400).json({ message: "Image or File missing" });
    }

    const newProduct = new Product({
      name,
      category,
      description,
      image,
      file
    });

    await newProduct.save();

    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

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


const getProductById = async (req, res) => {
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


// // Download HTML file from Cloudinary
const downloadProductFile = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product || !product.file) {
      return res.status(404).json({ message: "HTML file not found for this product" });
    }

    const response = await axios({
      method: 'get',
      url: product.file,
      responseType: 'stream',
    });

    res.setHeader('Content-Disposition', `attachment; filename="${product.name.replace(/\s+/g, '_')}.html"`);
    res.setHeader('Content-Type', 'text/html');
    response.data.pipe(res);
  } catch (error) {
    console.error("Error in downloadProductFile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get only downloadable products (those with a file)
const getDownloadableProducts = async (req, res) => {
  try {
    const products = await Product.find({ file: { $exists: true, $ne: "" } })
      .select("name category image description");
    if (!products.length) {
      return res.status(404).json({ message: "No downloadable products found" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("Error in getDownloadableProducts:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a product and re-upload files if needed
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, description } = req.body;

    let imageUrl = "";
    let fileUrl = "";

    if (req.files?.image?.[0]) {
      const result = await cloudinary.uploader.upload(req.files.image[0].path, {
        folder: "products/images",
      });
      imageUrl = result.secure_url;
      fs.unlinkSync(req.files.image[0].path);
    }

    if (req.files?.file?.[0]) {
      const fileResult = await cloudinary.uploader.upload(req.files.file[0].path, {
        folder: "products/files",
        resource_type: "raw",
      });
      fileUrl = fileResult.secure_url;
      fs.unlinkSync(req.files.file[0].path);
    }

    const updatedFields = {
      name,
      category,
      description,
      ...(imageUrl && { image: imageUrl }),
      ...(fileUrl && { file: fileUrl }),
      updatedAt: Date.now(),
    };

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error in updateProduct:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
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

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getDownloadableProducts,
  downloadProductFile,
  updateProduct,
  deleteProduct,
};
