import express from 'express';
import User from '../models/User.js';
import Task from '../models/Task.js';
import Query from '../models/Query.js'
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import Token from '../models/Token.js';
import sendMail from '../utils/sendMail.js';
import crypto from "crypto";
// import { protectRoute, admin } from '../middleware/authMiddleware.js';

const userRoutes = express.Router();

const genToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN, { expiresIn: '30d' });
};

function generateID() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 8; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

const registerUser = asyncHandler(async (req, res) => {
    const { ref, name, email, password, transactionPassword } = req.body;
    const refExists = await User.findOne({ referralId: ref });
    // if (!refExists) {
    //   res.status(400).send('User with such refferal code doesn\'t exists!');
    // }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).send('We already have an account with that email address.');
    }

    let referralId = generateID();
    while (await User.findOne({ referralId })) {
      referralId = generateID();
    }

    try {
      const user = await User.create({
        name,
        email,
        password,
        transactionPassword,
        referralId,
        referredBy: ref || null,
      });

      if (user && refExists) {
        refExists.refers.push({
          user: name,
          email: email,
          joined: new Date(),
        });
        await refExists.save();
      }
    
      if (user) {
        const token = await new Token({
          userID: user._id,
          token: crypto.randomBytes(16).toString("hex"),
        }).save();

        const url = `${process.env.BASE_URL}/users/verifyUser/${user._id}/${token.token}`;

        await sendMail(user.email, "Verify Email", url);

        res.status(201).json("An Email sent to your account. Please verify!");

      } else {
        res.status(400).send('We could not register you.');
        throw new Error('Something went wrong. Please check your data and try again.');
      }  
    } catch (error) {
      console.log(error.message);
    }
    
});

const verifyUser = asyncHandler (async (req, res) => {
  
  try {
		const user = await User.findById(req.params.id);
    
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userID: user._id,
			token: req.params.token,
		});
    
		if (!token) return res.status(400).send({ message: "Invalid link" });

		await User.updateOne({ _id: user._id }, { $set: { verified: true } });
		await token.deleteOne();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if(user.banned){
    return res.status(401).send('You are Banned!');
  }

  if (user && (await user.matchPasswords(password))) {
    if (!user.verified) {
			let token = await Token.findOne({ userId: user._id });
			if (!token) {
				token = await new Token({
					userId: user._id,
					token: crypto.randomBytes(32).toString("hex"),
				}).save();
				const url = `${process.env.BASE_URL}/users/verifyUser/${user._id}/${token.token}`;
				await sendMail(user.email, "Verify Email", url);
			}

			return res
				.status(400)
				.send({ message: "An Email sent to your account please verify" });
		}
    
    const {password: pass, ...rest} = user._doc;

    const now = new Date();
    const lastLogin = user.lastLogin ? new Date(user.lastLogin) : null;

    if (!lastLogin || now.toDateString() !== lastLogin.toDateString()) {
      user.dayReset = 0; // Reset the property
      user.lastLogin = now;
    }
    await user.save();
    console.log(rest);

    res.status(201).json(rest._id);
  } else {
    res.status(401).send('Invalid Email or Password');
    throw new Error('User not found.');
  }
});

export const signout = (req, res, next) => {
  try {
      res.
          clearCookie('access_token')
          .status(200)
          .json('Signed Out Successfully!')
  } catch (error) {
      next(error);
  } 
}

export const subscribe = async (req, res, next) => {
  const { value, id, type } = req.body;
  try {
    const user = await User.findById(id);
    const currentB = user.balance - type;
    console.log(currentB, type);
    
    user.subscribed = value || user.subscribed;
    user.balance = currentB;
    const updatedUser = await user.save();
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest._id);
  } catch (error) {
      next(error);
  } 
}

export const fetchTask = asyncHandler(async (req, res) => {
  const {id} = req.body;
  console.log("fetchTask");

  const task = await Task.findOne({ "users.id": { $ne: id } });
  if (task) {
    const user = await User.findById(id);
    user.currentSurvey = task._id;
    user.currentIndex = 0;
    user.dayReset = 1;
    task.users.push({ id });
    await task.save();
    const updatedUser = await user.save();
    const { password, ...rest } = updatedUser._doc;

    // const completedWithdrawals = updatedUser.withdrawalList.filter(withdrawal => withdrawal.status === 'complete');
    // const pendingWithdrawals = updatedUser.withdrawalList.filter(withdrawal => withdrawal.status === 'pending');
    // const rejectedWithdrawals = updatedUser.withdrawalList.filter(withdrawal => withdrawal.status === 'rejected');

    // rest.complete = completedWithdrawals;
    // rest.pending = pendingWithdrawals;
    // rest.reject = rejectedWithdrawals;

    // const queries = await Query.find({ userID:updatedUser._id }).sort({ createdAt: -1 });

    // rest.queries = queries;

    res.status(200).json(rest);
  } else {
    res.status(404).json('Task not Found!');
  }
});

const getTaskById = asyncHandler(async (req, res) => {
  const {id} = req.body;

  const task = await Task.findById(id);

  if (task) {
    res.json(task);
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

export const nextIndex = asyncHandler(async (req, res) => {
  const {id} = req.body;

  try {
    const user = await User.findById(id);
    user.currentIndex = user.currentIndex+1;
    const updatedUser = await user.save();
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest._id);

  } catch (error) {
    res.status(404).json(error.message);
  }
});

export const surveyDone = asyncHandler(async (req, res) => {
  const {id, taskId} = req.body;

  try {
    const user = await User.findById(id);
    const task = await Task.findById(taskId);
    user.currentIndex = 0;
    user.currentSurvey = "";
    user.surveyCount = user.surveyCount+1;
    user.dayReset = 2;
    user.balance = user.balance + task.reward;
    user.income = user.income + task.reward;

    if (user.referredBy) {
      const referrer = await User.findOne({ referralId: user.referredBy });
      if (referrer) {
        const referralBonus = reward * 0.05;
        referrer.refferalIncome += referralBonus;
        referrer.balance += referralBonus;
        await referrer.save();
      }
    }

    const updatedUser = await user.save();
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest._id);

  } catch (error) {
    res.status(404).json(error.message);
  }
});

export const transferBalance = async (req, res) => {
  try {
      const { senderId, email, amount } = req.body;

      const sender = await User.findById(senderId);
      const receiver = await User.findOne({ email });

      if (!sender || !receiver) {
          return res.status(404).json({ message: 'User not found' });
      }

      //console.log(sender.email == receiver.email);

      if (sender.email === receiver.email) {
        return res.status(500).json({ message: 'Receiver and Sender can not be same.' });
      }

      if (sender.balance < amount) {
          return res.status(400).json({ message: 'Insufficient balance' });
      }

      sender.balance -= amount;
      receiver.balance += (amount - 0.5);

      await receiver.save();
      const updatedUser = await sender.save();
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest._id);
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
};


const findUserByID = async (req, res) => {
    try {
        const id = req.query.id;
        const user = await User.findById(id);

        if(!user){
          res.status(404).json({ message: 'User Not Found!' });
        }

        const { password, ...rest } = user._doc;
        const completedWithdrawals = user.withdrawalList.filter(withdrawal => withdrawal.status === 'complete');
        const pendingWithdrawals = user.withdrawalList.filter(withdrawal => withdrawal.status === 'pending');
        const rejectedWithdrawals = user.withdrawalList.filter(withdrawal => withdrawal.status === 'rejected');

        rest.complete = completedWithdrawals;
        rest.pending = pendingWithdrawals;
        rest.reject = rejectedWithdrawals;

        const queries = await Query.find({ userID:user._id }).sort({ createdAt: -1 });

        rest.queries = queries;

        res.status(200).json(rest);


    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
}



userRoutes.route('/register').post(registerUser);
userRoutes.route('/login').post(loginUser);
userRoutes.route('/logout').post(signout);
userRoutes.route('/subscribe').post(subscribe);
userRoutes.route('/fetchTask').post(fetchTask);
userRoutes.route('/getTaskById').post(getTaskById);
userRoutes.route('/nextIndex').post(nextIndex);
userRoutes.route('/surveyDone').post(surveyDone);
userRoutes.route('/transferBalance').post(transferBalance);
userRoutes.route('/findUserByID').get(findUserByID);
userRoutes.route('/verifyUser/:id/:token').get(verifyUser);


export default userRoutes;
