//controllers\customer.controller.js
import { Customer } from "../models/Customer.model.js";



export const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message , stack: error.stack});
    }
};

export const createCustomer = async (req, res) => {
    try {
        console.log('Received customer data:', req.body);
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).json(customer);
    } catch (error) {
        console.error('Error creating customer:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        res.status(200).json(customer);
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(500).json({ message: "Server error" });
    }
};


export const updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json(customer);
    } catch (error) {
        console.error(error);
        if (error.kind === "ObjectId") {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(500).json({ message: "Server error" });
    }
}