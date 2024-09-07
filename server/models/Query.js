import mongoose from 'mongoose';

const querySchema = new mongoose.Schema(
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
    query: {
        type: String,
        required: true,
    },
    status: {
      type: String,
      default: 'Pending',
    },
    reply: {
      type: String,
      default: '',
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  { timestamps: true }
);

const Query = mongoose.model('Query', querySchema);
export default Query;
