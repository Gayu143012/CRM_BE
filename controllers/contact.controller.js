//controllers\contact.controller.js

import { Contact } from "../models/Contact.model.js";

export const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json(contact);
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(500).json({ message: "Server error" });
    }
};

export const createContact = async (req, res) => {
    try {
        const newContact = new Contact({ ...req.body, userId: req.userId });
        const contact = await newContact.save();
        res.status(201).json(contact);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json(contact);
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(500).json({ message: "Server error" });
    }

};

export const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        console.error('Error deleting contact:', error);
        if (error.kind === "ObjectId") {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getUserContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({ userId: req.userId });
        res.status(200).json(contacts);
    } catch (error) {
        console.error('Error getting user contacts:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};