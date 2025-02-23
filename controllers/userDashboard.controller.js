import { Customer } from '../models/Customer.model.js';
import { Communication } from '../models/Communication.model.js';
import { Task } from '../models/Task.model.js';
import { Contact } from '../models/Contact.model.js';
import { Order } from '../models/Order.model.js';

export const getUserDashboardData = async (req, res) => {
  try {
    console.log('Fetching dashboard data for user:', req.userId);
    const recentContacts = await Contact.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('customerId', 'name');
    const recentCommunications = await Communication.find().sort({ date: -1 }).limit(5);
    const tasksDue = await Task.find({ dueDate: { $gte: new Date() } }).sort({ dueDate: 1 }).limit(5);

    const totalCustomers = await Customer.countDocuments();
    const newCustomersThisMonth = await Customer.countDocuments({
      createdAt: { $gte: new Date(new Date().setDate(1)) } 
    });

    const topSpendingCustomer = await Customer.findOne().sort({ 'purchaseHistory.total': -1 }).select('name');

    const dashboardData = {
      recentContacts,
      recentCommunications,
      tasksDue,
      totalCustomers,
      newCustomersThisMonth,
      topSpendingCustomer,
      recentOrders
    };
    console.log('Dashboard data:', dashboardData);
    res.json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};