const { cloudinary } = require("../config/cloudinary");
const Testimonial = require("../models/Testimonial.model");

// **Create a New Blog Post with Image Upload**
const createTestimonial = async (req, res) => {
  try {
    const { name, position, organization, photo, message } = req.body;

    // Check if a team member with the same name & position already exists
    const existingMember = await Testimonial.findOne({ name });

    if (existingMember) {
      return res.status(400).json({ message: "Testimonial member already exists" });
    }

    // Create new team member
    const newTestimonial = new Testimonial({ name, position, organization, photo, message });
    await newTestimonial.save();

    res.status(201).json({ message: "Testimonial member created successfully", Testimonial: newTestimonial });
  } catch (error) {
    console.error("Error in createTeam:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllTestimonial = async (req, res) => {
  try {
    const Test = await Testimonial.find();

    if (!Test.length) {
      return res.status(404).json({ message: "No Test posts found" });
    }

    res.status(200).json(Test);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Get Single Blog Post by ID**
// const getBlogById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const blog = await Blog.findById(id);

//     if (!blog) {
//       return res.status(404).json({ message: "Blog post not found" });
//     }

//     res.status(200).json(blog);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// **Update Blog Post with Image Upload**
// const updateBlog = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, content, tags, isPublished, image } = req.body;
//     let imageUrl = '';

//     if (image) {
//       const result = await cloudinary.uploader.upload(image, { folder: "blogs" });
//       imageUrl = result.secure_url; 
//     }

//     const updatedBlog = await Blog.findByIdAndUpdate(
//       id,
//       { title, content, tags, isPublished, image: imageUrl, updatedAt: Date.now() },
//       { new: true }
//     );

//     if (!updatedBlog) {
//       return res.status(404).json({ message: "Blog post not found" });
//     }

//     res.status(200).json({ message: "Blog post updated successfully", updatedBlog });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// **Delete a Blog Post**
// const deleteBlog = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedBlog = await Blog.findByIdAndDelete(id);

//     if (!deletedBlog) {
//       return res.status(404).json({ message: "Blog post not found" });
//     }

//     res.status(200).json({ message: "Blog post deleted successfully" });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

module.exports = { createTestimonial, getAllTestimonial};
