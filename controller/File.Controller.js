const File = require("../models/Code.model");
const { cloudinary } = require("../config/cloudinary"); // Import cloudinary directly
const fs = require("fs");
const path = require("path");

/**
 * Upload file to Cloudinary and generate HTML for download
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const uploadFile = async (req, res) => {
  try {
    // Check if file exists in request
    if (!req.files || !req.files.codeFile) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    
    const file = req.files.codeFile;
    console.log("Received File:", file);
    
    // Upload the file to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "codes",
      resource_type: "raw", // Allows any file type
    });
    
    // Clean up temp file after upload
    if (fs.existsSync(file.tempFilePath)) {
      fs.unlinkSync(file.tempFilePath);
    }
    
    const fileUrl = uploadResponse.secure_url;
    const originalname = file.name;
    
    // Save file details in MongoDB
    const newFile = new File({ 
      filename: originalname, 
      fileUrl,
      uploadDate: new Date()
    });
    await newFile.save();
    
    // Generate HTML content for the file
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Uploaded File</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
          text-align: center;
        }
        .download-link {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #4CAF50;
          color: white;
          text-decoration: none;
          border-radius: 4px;
        }
      </style>
    </head>
    <body>
      <h1>Uploaded File: ${originalname}</h1>
      <p><a href="${fileUrl}" class="download-link" target="_blank">Download File</a></p>
    </body>
    </html>
    `;
    
    const htmlFileName = `${path.parse(originalname).name}.html`;
    const downloadsDir = path.join(__dirname, "../downloads");
    
    // Create downloads directory if it doesn't exist
    if (!fs.existsSync(downloadsDir)) {
      fs.mkdirSync(downloadsDir, { recursive: true });
    }
    
    const htmlFilePath = path.join(downloadsDir, htmlFileName);
    fs.writeFileSync(htmlFilePath, htmlContent);
    
    // Send file for download and handle cleanup
    res.download(htmlFilePath, htmlFileName, (err) => {
      if (err) {
        console.error("Error sending file:", err);
        return res.status(500).json({ message: "Error downloading file" });
      }
      
      // Clean up the HTML file after sending
      if (fs.existsSync(htmlFilePath)) {
        fs.unlinkSync(htmlFilePath);
      }
    });
  } catch (error) {
    console.error("Upload Failed:", error);
    res.status(500).json({ 
      message: "Internal Server Error", 
      error: error.message 
    });
  }
};

/**
 * Get all uploaded files
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllFiles = async (req, res) => {
  try {
    const files = await File.find().sort({ uploadDate: -1 });
    res.status(200).json(files);
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ 
      message: "Internal Server Error", 
      error: error.message 
    });
  }
};

module.exports = { uploadFile, getAllFiles };