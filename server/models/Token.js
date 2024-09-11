import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: { type: Date, default: Date.now, expires: 3600 },
  },
  { timestamps: true }
);

const Token = mongoose.model('Token', tokenSchema);
export default Token;
