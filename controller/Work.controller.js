const Work = require("../models/Work.model");

// ➕ Create a new work item
exports.createWork = async (req, res) => {
  try {
    const newWork = new Work(req.body);
    const savedWork = await newWork.save();
    res.status(201).json(savedWork);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 📃 Get all work items
exports.getAllWorks = async (req, res) => {
  try {
    const works = await Work.find().sort({ createdAt: -1 });
    res.json(works);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔍 Get a single work by ID
exports.getWorkById = async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);
    if (!work) return res.status(404).json({ error: "Work not found" });
    res.json(work);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✏️ Update a work item by ID
exports.updateWork = async (req, res) => {
  try {
    const updatedWork = await Work.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedWork) return res.status(404).json({ error: "Work not found" });
    res.json(updatedWork);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ❌ Delete a work item by ID
exports.deleteWork = async (req, res) => {
  try {
    const deletedWork = await Work.findByIdAndDelete(req.params.id);
    if (!deletedWork) return res.status(404).json({ error: "Work not found" });
    res.json({ message: "Work deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
