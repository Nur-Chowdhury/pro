import Deposit from '../models/Deposit.js';
import express from 'express'

const depositRoutes = express.Router();

function genToken() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 8; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

export const addDepositRequest = async (req, res) => {
    try {
      const { userID, accountNumber, cashOutTime, amount, type } = req.body;

      let token = genToken(); 
      while (await Deposit.findOne({ token })) {
        token = genToken(); 
      }

      const newDeposit = new Deposit({
        token,
        userID,
        accountNumber,
        cashOutTime,
        amount,
        type,
      });
  
      const savedDeposit = await newDeposit.save();
      res.status(201).json(savedDeposit);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
}

export const getUserDeposits = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const id = req.query.id;
  const limit = 25;
    
  try {
    const total = await Deposit.countDocuments({ userID: id });

    const deposits = await Deposit.find({ userID: id })
      .populate('userID', 'name email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: deposits,
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

depositRoutes.route('/add').post(addDepositRequest);
depositRoutes.route('/getUserDeposits').get(getUserDeposits);


export default depositRoutes;