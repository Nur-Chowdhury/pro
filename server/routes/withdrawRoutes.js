import express from 'express'
import Withdraw from '../models/Withdraw.js';

const withdrawRoutes = express.Router();

function genToken() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 8; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

export const addWithdrawRequest = async (req, res) => {
    try {
      const { userID, accountNumber, amount, type } = req.body;

      let token = genToken();
      while (await Withdraw.findOne({ token })) {
        token = genToken(); 
      }

      const newWithdraw = new Withdraw({
        token,
        userID,
        accountNumber,
        amount,
        type,
      });
  
      const savedWithdraw = await newWithdraw.save();
      res.status(201).json(savedWithdraw);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
}

export const getUserWithdraws = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const id = req.query.id;
  const limit = 25;

  try {
    // Get the total count of withdrawals for the given user
    const total = await Withdraw.countDocuments({ userID: id });

    // Fetch withdrawals with pagination
    const withdraws = await Withdraw.find({ userID: id })
      .populate('userID', 'name email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: withdraws,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch withdrawals',
      error: error.message,
    });
  }
};

withdrawRoutes.route('/add').post(addWithdrawRequest);
withdrawRoutes.route('/getUserWithdraws').get(getUserWithdraws);

export default withdrawRoutes;