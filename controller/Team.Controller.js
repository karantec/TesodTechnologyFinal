const { cloudinary } = require("../config/cloudinary");
const TeamMember = require("../models/Team.model");

// **Create a New Blog Post with Image Upload**
const createTeam = async (req, res) => {
  try {
    const { name, position, photo, category } = req.body;

    // Check if a team member with the same name & position already exists
    const existingMember = await TeamMember.findOne({ name, position });

    if (existingMember) {
      return res.status(400).json({ message: "Team member already exists" });
    }

    // Create new team member
    const newTeam = new TeamMember({ name, position, photo, category });
    await newTeam.save();

    res.status(201).json({ message: "Team member created successfully", teamMember: newTeam });
  } catch (error) {
    console.error("Error in createTeam:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllTeams = async (req, res) => {
  try {
    const Teams = await TeamMember.find();

    if (!Teams.length) {
      return res.status(404).json({ message: "No Teams posts found" });
    }

    res.status(200).json(Teams);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Get Single Blog Post by ID**
const getTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    const TeamMembers = await TeamMember.findById(id);

    if (!TeamMembers) {
      return res.status(404).json({ message: "TeamMember not found" });
    }

    res.status(200).json(TeamMembers);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Update Blog Post with Image Upload**
const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, photo, category } = req.body;
    
    let imageUrl = photo; // Default to existing photo

    if (photo) {
      const result = await cloudinary.uploader.upload(photo, { folder: "blogs" });
      imageUrl = result.secure_url; 
    }

    const updatedBlog = await TeamMember.findByIdAndUpdate(
      id,
      { name, position, category, photo: imageUrl, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.status(200).json({ message: "Blog post updated successfully", updatedBlog });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// **Delete a Blog Post**
const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the team member first
    const teamMember = await TeamMember.findById(id);
    if (!teamMember) {
      return res.status(404).json({ message: "Team member not found" });
    }

    // Delete associated photo from Cloudinary if it exists
    if (teamMember.photo) {
      const publicId = teamMember.photo.split("/").pop().split(".")[0]; // Extract public ID
      await cloudinary.uploader.destroy(`blogs/${publicId}`);
    }

    // Delete the team member
    await TeamMember.findByIdAndDelete(id);

    res.status(200).json({ message: "Team member deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = { createTeam, getAllTeams,getTeamById, updateTeam,deleteTeam};
