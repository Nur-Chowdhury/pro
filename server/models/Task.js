import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
    {
      type: {
        type: String,
        required: true,
      },
      question: {
        type: String,
        required: true,
      },
      bangla: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        default: "*",
      },
      options: [{
        type: String,
      }]
    },
    { timestamps: true }
);


const taskSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
        }, 
        name: {
          type: String,
          required: true,
        },
        reward:{
          type: Number,
          required: true,
        },
        users: [{
          id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
        }],
        questions: [questionSchema],
    },{ 
        timestamps: true
    }
)

const Task = mongoose.model('Task', taskSchema);
export default Task;