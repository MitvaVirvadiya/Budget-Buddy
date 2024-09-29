import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  month: {
    type: Number, 
    required: true,
    min: 1,
    max: 12
  },
  year: {
    type: Number,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Budget = mongoose.model('Budget', budgetSchema);

export default Budget;
