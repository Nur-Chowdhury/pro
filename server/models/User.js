import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const withdrawSchema = new mongoose.Schema(
  {
    transaction: { type: String, required: true },
    gateway: { type: String, required: true },
    amount: { type: Number, required: true },
    charge: { type: Number, required: true },
    rate: { type: Number, required: true },
    status: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  { timestamps: true }
);

const referSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true,},
    email: { type: String, required: true,},
    joined: { type: Date, required: true},
  },
  { timestamps: true }
);

const referEarnSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true,},
    email: { type: String, required: true,},
    earned: { type: Number, default: 0 },
    time: { type: Date, required: true},
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    transactionPassword: {
        type: String,
        required: true,
    },
    verified:{
      type: Boolean,
      default: false,
    },
    income:{
        type: Number,
        default: 0.0,
    },
    invest:{
        type: Number,
        default: 0.0,
    },
    deposit:{
      type: Number,
      default: 0.0,
    },
    withdraw:{
      type: Number,
      default: 0.0,
    },
    withdrawalList: [withdrawSchema],
    balance:{ 
      type: Number,
      default: 0.0,
    },
    referralId: {
      type: String,
      unique: true,
    },
    referredBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      // required: true, 
      ref: 'User',
    },
    refers:[referSchema],
    refferalIncome:{
      type: Number,
      default: 0.0,
    },
    refferalIncomeList:[referEarnSchema],
    admin:{
      type: Boolean,
      default: false,
    },
    subscribed:{
      type: String,
      default: "none",
    },
    lastWorked: { 
      type: Date, 
      default: null
    },
    surveyCount: {
      type: Number,
      default: 0,
    },
    currentSurvey: {
      type: String,
      default: "",
    },
    currentIndex:{
      type: Number,
      default: 0,
    },
    banned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
export default User;
