import mongoose, { Schema } from "mongoose";
import { ExpenseCategoryEnum } from "../../constants.js";

const expenseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ExpenseCategoryEnum,
    required: true,
  },
  description: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

expenseSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
