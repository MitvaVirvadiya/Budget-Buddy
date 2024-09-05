import Expense from "../../models/expenses/expense.models.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const createExpense = asyncHandler(async (req, res) => {
  const expense = new Expense(req.body);
  expense.owner = req.user._id;

  await expense.save();

  res
    .status(201)
    .json(new ApiResponse(201, expense, "Expense created successfully"));
});

export const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find();

  res
    .status(200)
    .json(new ApiResponse(200, expenses, "Expenses retrieved successfully"));
});

export const getExpenseById = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (!expense) {
    throw new ApiError(404, "Expense not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, expense, "Expense retrieved successfully"));
});

export const updateExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!expense) {
    throw new ApiError(404, "Expense not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, expense, "Expense updated successfully"));
});

export const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findByIdAndDelete(req.params.id);
  if (!expense) {
    throw new ApiError(404, "Expense not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, "Expense deleted successfully"));
});
