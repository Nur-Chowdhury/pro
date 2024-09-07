import express from 'express';
import User from '../models/User.js';
import Task from '../models/Task.js';
import Query from '../models/Query.js';
import Deposit from '../models/Deposit.js';
import Withdraw from '../models/Withdraw.js';


const adminRoutes = express.Router();


export const addTask = async (req, res) => {
    try {
        const { type, name, reward, questions, id } = req.body;
        const user = await User.findById(id);
        if(user.admin){
            const newTask = new Task({
                type,
                name,
                reward,
                questions,
            });
            await newTask.save();
            res.status(201).json({
                message: 'Task added successfully',
            });
        }else{
            res.status(401).json({
                message: 'Unauthorized!',
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error adding task',
            error: error.message
        });
    }
}


export const getAllQueries = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 25; 
    
  try {
    const queries = await Query.find()
      .populate('userID', 'name email')
      .populate('admin', 'name email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Query.countDocuments();

    res.status(200).json({
      success: true,
      data: queries,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch queries',
      error: error.message,
    });
  }
};

export const addReply = async (req, res) => {
  const { queryId, reply, adminId } = req.body;

  try {
    const updatedQuery = await Query.findByIdAndUpdate(
      queryId,
      {
        reply: reply,
        status: 'Replied',
        admin: adminId,
      },
      { new: true }
    ).populate('userID', 'name email')
     .populate('admin', 'name email');

    if (!updatedQuery) {
      return res.status(404).json({
        success: false,
        message: 'Query not found',
      });
    }

    res.status(200).json({
      success: true,
      data: updatedQuery,
      message: 'Reply added successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add reply',
      error: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 25;
    
  try {
    const users = await User.find()
      .select('-password -transactionPassword')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await User.countDocuments();

    res.status(200).json({
      success: true,
      data: users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message,
    });
  }
};


export const getAllDeposits = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 25;
  
    
  try {
    const deposits = await Deposit.find()
      .populate('userID', 'name email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Deposit.countDocuments();

    res.status(200).json({
      success: true,
      data: deposits,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message,
    });
  }
};

export const acceptDeposit = async (req, res) => {
  const {depositID} = req.body;
  
  try {
    const deposit = await Deposit.findById(depositID)

    const user = await User.findById(deposit.userID);

    user.invest += deposit.amount;
    user.deposit += deposit.amount;
    user.balance += deposit.amount;

    deposit.status = "Accepted"

    const updatedUser = await user.save();
    const updatedDeposit = await deposit.save();

    res.status(200).json({
      success: true,
      data: updatedDeposit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to accept',
      error: error.message,
    });
  }
};


export const rejectDeposit = async (req, res) => {
  const {depositID} = req.body;
  
  try {
    const deposit = await Deposit.findById(depositID)

    deposit.status = "Rejected"
    const updatedDeposit = await deposit.save();

    res.status(200).json({
      success: true,
      data: updatedDeposit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to accept',
      error: error.message,
    });
  }
};

export const getAllWithdraws = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 25;
  
    
  try {
    const withdraws = await Withdraw.find()
      .populate('userID', 'name email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Withdraw.countDocuments();

    res.status(200).json({
      success: true,
      data: withdraws,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message,
    });
  }
};

export const acceptWithdraw = async (req, res) => {
  const {withdrawID} = req.body;
  console.log(withdrawID);
  
  
  try {
    const withdraw = await Withdraw.findById(withdrawID)

    const user = await User.findById(withdraw.userID);

    user.withdraw += withdraw.amount;
    user.balance += withdraw.amount;

    withdraw.status = "Accepted"

    const updatedUser = await user.save();
    const updatedWithdraw = await withdraw.save();

    res.status(200).json({
      success: true,
      data: updatedWithdraw,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to accept',
      error: error.message,
    });
  }
};


export const rejectWithdraw = async (req, res) => {
  const {withdrawID} = req.body;
  
  try {
    const withdraw = await Withdraw.findById(withdrawID)

    withdraw.status = "Rejected"
    const updatedWithdraw = await withdraw.save();

    res.status(200).json({
      success: true,
      data: updatedWithdraw, 
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to accept',
      error: error.message,
    });
  }
};

export const makeAdmin = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.admin = true;
    await user.save();
    res.status(200).json({ message: 'User promoted to admin successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to promote user to admin', error: error.message });
  }
};

export const banUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.banned = true;
    await user.save();

    res.status(200).json({ message: 'User banned successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to ban user', error: error.message });
  }
};



adminRoutes.route('/addTask').post(addTask);
adminRoutes.route('/getAllQueries').get(getAllQueries);
adminRoutes.route('/addReply').post(addReply);
adminRoutes.route('/getAllUsers').get(getAllUsers);
adminRoutes.route('/getAllDeposits').get(getAllDeposits);
adminRoutes.route('/acceptDeposit').post(acceptDeposit);
adminRoutes.route('/rejectDeposit').post(rejectDeposit);
adminRoutes.route('/getAllWithdraws').get(getAllWithdraws);
adminRoutes.route('/acceptWithdraw').post(acceptWithdraw);
adminRoutes.route('/rejectWithdraw').post(rejectWithdraw);
adminRoutes.route('/makeAdmin/:id').post(makeAdmin);
adminRoutes.route('/banUser/:id').post(banUser);

export default adminRoutes;