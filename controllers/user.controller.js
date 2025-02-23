import { User } from "../models/User.model.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export const updateUser = async (req, res) => {
    try {
        const { name, email, role, password } = req.body;
        const userFields = {};
        if (name) userFields.name = name;
        if (email) userFields.email = email;
        if (role) userFields.role = role;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            userFields.password = await bcrypt.hash(password, salt);
        }

        let user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: userFields },
            { new: true }
        ).select('-password');

        if (!user) return res.status(404).json({ msg: 'User not found' });

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) return res.status(404).json({ msg: 'User not found' });

        await User.findByIdAndDelete(req.params.id);

        res.json({ msg: 'User removed' });
    } catch (err) {
        console.error('Error in deleteUser:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

export const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        ).select('-password');

        if (!user) return res.status(404).json({ msg: 'User not found' });

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export const updateUserProfile = async (req, res) => {
    try {
      console.log('Received profile update request:', req.body);
      console.log('User ID from token:', req.userId);
  
      const { name, email, password } = req.body;
      const userFields = {};
      if (name) userFields.name = name;
      if (email) userFields.email = email;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        userFields.password = await bcrypt.hash(password, salt);
      }
  
      console.log('User fields to update:', userFields);
  
      if (!req.userId) {
        return res.status(401).json({ message: 'User ID not found in request' });
      }
  
      let user = await User.findByIdAndUpdate(
        req.userId,
        { $set: userFields },
        { new: true }
      ).select('-password');
  
      if (!user) {
        console.log('User not found');
        return res.status(404).json({ msg: 'User not found' });
      }
  
      console.log('Updated user:', user);
      res.json(user);
    } catch (err) {
      console.error('Error in updateUserProfile:', err);
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  };