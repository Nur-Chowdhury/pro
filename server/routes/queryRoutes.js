import express from 'express';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import Query from '../models/Query.js';


const queryRoutes = express.Router();

function generateID() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 6; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
}


export const addQuery = asyncHandler(async (req, res) => {
    const {description, id} = req.body;

    let token = generateID();
    while (await Query.findOne({ token })) {
      token = generateID(); 
    }
  
    try {
        const user = await User.findById(id);
      
        const query = await Query.create({
            token,
            userID: user._id,
            query: description,
        });

        const completedWithdrawals = user.withdrawalList.filter(withdrawal => withdrawal.status === 'complete');
        const pendingWithdrawals = user.withdrawalList.filter(withdrawal => withdrawal.status === 'pending');
        const rejectedWithdrawals = user.withdrawalList.filter(withdrawal => withdrawal.status === 'rejected');

        const { password, ...rest } = user._doc;

        rest.complete = completedWithdrawals;
        rest.pending = pendingWithdrawals;
        rest.reject = rejectedWithdrawals;

        const queries = await Query.find({ userID:user._id });

        rest.queries = queries;

        res.status(200).json(rest);
  
    } catch (error) {
      res.status(404).json(error.message);
    }
});

queryRoutes.route('/addQuery').post(addQuery);


export default queryRoutes;

