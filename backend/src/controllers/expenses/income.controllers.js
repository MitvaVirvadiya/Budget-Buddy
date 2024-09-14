import Income from "../../models/expenses/income.models.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

// Create new income
export const createIncome = asyncHandler(async (req, res) => {
  const income = new Income(req.body);
  income.owner = req.user._id;

  await income.save();

  res
    .status(201)
    .json(new ApiResponse(201, income, "Income created successfully"));
});

// Get all incomes for the user
export const getIncomes = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const incomes = await Income.find({ owner: userId });

  res
    .status(200)
    .json(new ApiResponse(200, incomes, "Incomes retrieved successfully"));
});

// Get income by ID
export const getIncomeById = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const income = await Income.findOne({ _id: req.params.id, owner: userId });

  if (!income) {
    throw new ApiError(404, "Income not found or you don't have access to it");
  }

  res
    .status(200)
    .json(new ApiResponse(200, income, "Income retrieved successfully"));
});

export const updateIncome = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  let income = await Income.findOne({ _id: req.params.id, owner: userId });

  if (!income) {
    throw new ApiError(
      403,
      "No permission to update this income or income not found"
    );
  }

  income.updatedAt = Date.now(); // Update the updatedAt field

  income = await Income.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res
    .status(200)
    .json(new ApiResponse(200, income, "Income updated successfully"));
});

export const deleteIncome = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const income = await Income.findOne({ _id: req.params.id, owner: userId });

  if (!income) {
    throw new ApiError(
      403,
      "No permission to delete this income or income not found"
    );
  }

  await Income.findByIdAndDelete(req.params.id);

  res
    .status(200)
    .json(new ApiResponse(200, null, "Income deleted successfully"));
});
