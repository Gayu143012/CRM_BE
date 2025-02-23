import { User } from '../models/User.model.js';

export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (user.role !== 'admin') {
            return res.status(403).json({ message: "Requires Admin Role" });
        }
        next();
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};