import mongoose from 'mongoose';

const withdrawSchema = new mongoose.Schema(
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

const Withdraw = mongoose.model('Withdraw', withdrawSchema);
export default Withdraw;