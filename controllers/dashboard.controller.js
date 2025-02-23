import { Customer } from '../models/Customer.model.js';
import { Communication } from '../models/Communication.model.js';
import { Task } from '../models/Task.model.js';

export const getUserDashboardData = async (req, res) => {
  try {
    console.log('Fetching dashboard data for user:', req.userId);
    const recentCustomers = await Customer.find().sort({ createdAt: -1 }).limit(5);
    const recentCommunications = await Communication.find().sort({ date: -1 }).limit(5);
    const tasksDue = await Task.find({ dueDate: { $gte: new Date() } }).sort({ dueDate: 1 }).limit(5);

    const totalCustomers = await Customer.countDocuments();
    const newCustomersThisMonth = await Customer.countDocuments({
      createdAt: { $gte: new Date(new Date().setDate(1)) } 
    });
    let popularTextileChoices = await Customer.aggregate([
      { $group: { _id: '$preferences.fabricTypes', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // Provide sample data for popular textile choices if none exist
    if (!popularTextileChoices.length) {
      popularTextileChoices = [
        { _id: 'Cotton', count: 10 },
        { _id: 'Silk', count: 8 },
        { _id: 'Linen', count: 6 },
        { _id: 'Wool', count: 4 },
        { _id: 'Polyester', count: 2 }
      ];
    }

    let monthlySales = await Customer.aggregate([
      { $unwind: '$purchaseHistory' },
      {
        $group: {
          _id: { $month: '$purchaseHistory.date' },
          sales: { $sum: '$purchaseHistory.total' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Provide sample data for monthly sales if none exist
    if (!monthlySales.length) {
      monthlySales = Array.from({ length: 12 }, (_, i) => ({
        _id: i + 1,
        sales: Math.floor(Math.random() * 10000)
      }));
    }
      const topSpendingCustomer = await Customer.findOne().sort({ 'purchaseHistory.total': -1 }).select('name');


    const dashboardData = {
      recentCustomers,
      recentCommunications,
      tasksDue,
      totalCustomers,
      newCustomersThisMonth,
      topSpendingCustomer,
      popularTextileChoices,
      monthlySales
    };
    console.log('Dashboard data:', dashboardData);
    res.json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Server error' });
  }

};

export const getPopularTextileChoices = async (req, res) => {
  try {
    const popularTextileChoices = await Customer.aggregate([{ $group: { _id: '$textile', count: { $sum: 1 } } }]);
    res.json(popularTextileChoices);
  } catch (error) {
    console.error('Error fetching popular textile choices:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getFollowUpActions = async (req, res) => {
  try {
      const followUpActions = await FollowUpAction.find();
    res.json(followUpActions);
  } catch (error) {
    console.error('Error fetching follow-up actions:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTasksDue = async (req, res) => {
  try {
    const tasksDue = await Task.find({ dueDate: { $gte: new Date() } }).sort({ dueDate: 1 }).limit(5);
    res.json(tasksDue);
  } catch (error) {
    console.error('Error fetching tasks due:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTotalCustomers = async (req, res) => {
  try {
    const totalCustomers = await Customer.countDocuments();
    res.json(totalCustomers);
  } catch (error) {
    console.error('Error fetching total customers:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getNewCustomersThisMonth = async (req, res) => {
  try {
    const newCustomersThisMonth = await Customer.countDocuments({
      createdAt: { $gte: new Date(new Date().setDate(1)) } 
    });
    res.json(newCustomersThisMonth);
  } catch (error) {
    console.error('Error fetching new customers this month:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTopSpendingCustomer = async (req, res) => {
  try {
    const topSpendingCustomer = await Customer.findOne().sort({ 'purchaseHistory.total': -1 }).select('name');
    res.json(topSpendingCustomer);
  } catch (error) {
    console.error('Error fetching top spending customer:', error);
    res.status(500).json({ message: 'Server error' });
  }
};






