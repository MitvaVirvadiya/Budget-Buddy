import mongoose, { Schema } from "mongoose";
import { IncomeCategoryEnum } from "../../constants.js";

const incomeSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: IncomeCategoryEnum, 
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  receivedDate: {
    type: Date,
    default: Date.now,
  },
  recurring: {
    type: Boolean,
    default: false,
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

incomeSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Income = mongoose.model("Income", incomeSchema);

export default Income;