import { Feedback } from "../models/Feedback.model.js";

export const getAllFeedback = async (req, res) => {
    try {
        const Feedbacks = await Feedback.find().populate('customerId');
        res.status(200).json(Feedbacks);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const createFeedback = async (req, res) => {
    try {
        console.log('Received feedback data:', req.body);
        const newFeedback = new Feedback(req.body);
        const feedback = await newFeedback.save();
        res.status(201).json(feedback);
    } catch (error) {
        console.error('Error creating feedback:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getFeedbackByCustomer = async (req, res) => {
    try {
        const Feedback = await Feedback.find({ customerId: req.params.customerId});
        res.status(200).json(Feedback);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}