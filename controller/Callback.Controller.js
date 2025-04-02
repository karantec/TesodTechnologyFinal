const CallbackRequest = require("../models/Callback.model");

// **Create a New Callback Request**
const createCallbackRequest = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, preferredDate, preferredTime, message } = req.body;

    // Create new callback request
    const newCallbackRequest = new CallbackRequest({ fullName, email, phoneNumber, preferredDate, preferredTime, message });
    await newCallbackRequest.save();

    res.status(201).json({ message: "Callback request created successfully", request: newCallbackRequest });
  } catch (error) {
    console.error("Error in createCallbackRequest:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Get All Callback Requests**
const getAllCallbackRequests = async (req, res) => {
  try {
    const requests = await CallbackRequest.find();
    if (!requests.length) {
      return res.status(404).json({ message: "No callback requests found" });
    }
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createCallbackRequest, getAllCallbackRequests };
