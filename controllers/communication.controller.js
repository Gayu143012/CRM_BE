//controllers\communication.controller.js

import {Communication} from "../models/Communication.model.js";

export const getAllCommunications = async (req, res) => {
    try {
        const communications = await Communication.find().populate('customerId');
        res.status(200).json(communications);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const createCommunication = async (req, res) => {
    try {
        console.log('Received communication data:', req.body);
        const newCommunication = new Communication({
            ...req.body,
            createdBy: req.userId
        });
        let communication = await newCommunication.save();
        communication = await Communication.findById(communication._id).populate('customerId').populate('createdBy').populate('assignedTo');
        res.status(201).json(communication);
    } catch (error) {
        console.error('Error creating communication:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const updateCommunication = async (req, res) => {
    try {
        const communication = await Communication.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('customerId')
            .populate('createdBy')
            .populate('assignedTo');
        res.status(200).json(communication);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getQueriesByCustomer = async (req, res) => {
    try {
        const queries = await Communication.find({ 
            customerId: req.params.customerId,
            type: 'query'
        }).populate('customerId').populate('createdBy').populate('assignedTo');
        res.status(200).json(queries);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getAllQueries = async (req, res) => {
    try {
        const queries = await Communication.find({ type: 'query' })
            .populate('customerId')
            .populate('createdBy')
            .populate('assignedTo');
        res.status(200).json(queries);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteCommunication = async (req, res) => {
    try {
        await Communication.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Communication deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getCommunicationByCustomer = async (req, res) => {
    try {
        const communications = await Communication.find({ customerId: req.params.id });
        res.status(200).json(communications);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}
