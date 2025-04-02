const Contact = require("../models/Contact.model");

// **Create a New Contact Section**
const createContact = async (req, res) => {
    try {
        const { firstName, lastName, email, message } = req.body;

        // Create new Contact entry
        const newContact = new Contact({ firstName, lastName, email, message });
        await newContact.save();

        res.status(201).json({ message: "Contact created successfully", contact: newContact });
    } catch (error) {
        console.error("Error in createContact:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// **Get All Contact Entries**
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();

        if (!contacts.length) {
            return res.status(404).json({ message: "No contact entries found" });
        }

        res.status(200).json(contacts);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// **Update Contact Entry**
const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, message } = req.body;

        const updatedContact = await Contact.findByIdAndUpdate(
            id,
            { firstName, lastName, email, message },
            { new: true }
        );

        if (!updatedContact) {
            return res.status(404).json({ message: "Contact entry not found" });
        }

        res.status(200).json({ message: "Contact updated successfully", contact: updatedContact });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// **Delete Contact Entry**
const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedContact = await Contact.findByIdAndDelete(id);

        if (!deletedContact) {
            return res.status(404).json({ message: "Contact entry not found" });
        }

        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { createContact, getAllContacts, updateContact, deleteContact };
