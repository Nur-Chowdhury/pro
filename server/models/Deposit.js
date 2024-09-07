import mongoose from 'mongoose';

const depositSchema = new mongoose.Schema(
  {
    token: {
        type: String,
        required: true,
        unique: true,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    accountNumber: {
        type: String,
        required: true,
    },
    cashOutTime: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Pending"
    },
  }, 
  {timestamps: true}
);

const Deposit = mongoose.model('Deposit', depositSchema);
export default Deposit;