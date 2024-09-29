import Budget from '../../models/expenses/budget.models.js';
import { getTotalExpensesForMonth } from '../../utils/Expense.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

export const createBudget = asyncHandler(async (req, res) => {
  const { amount, month, year } = req.body;
  const owner = req.user._id;

  const existingBudget = await Budget.findOne({ owner, month, year });

  if (existingBudget) {
    throw new ApiError(400, 'Budget already exists for this month/year.');
  }

  const budget = new Budget({ amount, month, year, owner });
  await budget.save();

  res.status(201).json(new ApiResponse(201, budget, 'Budget created successfully'));
});

export const updateBudget = asyncHandler(async (req, res) => {
  const { month, year, amount } = req.body;
  const owner = req.user._id;

  const budget = await Budget.findOneAndUpdate(
    { owner, month, year },
    { amount, updatedAt: Date.now() },
    { new: true }
  );

  if (!budget) {
    throw new ApiError(404, 'Budget not found for this month/year.');
  }

  res.status(200).json(new ApiResponse(200, budget, 'Budget updated successfully'));
});

export const deleteBudget = asyncHandler(async (req, res) => {
  const { month, year } = req.params;
  const owner = req.user._id;

  const budget = await Budget.findOneAndDelete({ owner, month, year });

  if (!budget) {
    throw new ApiError(404, 'Budget not found.');
  }

  res.status(200).json(new ApiResponse(200, null, 'Budget deleted successfully'));
});

export const getBudget = asyncHandler(async (req, res) => {
  let { month, year } = req.query;
  const owner = req.user._id;

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; 
  const currentYear = currentDate.getFullYear();

  month = month || currentMonth;
  year = year || currentYear;

  const budget = await Budget.findOne({ owner, month, year });

  if (!budget) {
    return res.status(200).json(new ApiResponse(200, null, "No budget set for this month. Create one.", {
      budgetExists: false,
      totalExpenses: 0,
    }));
  }

  const totalExpenses = await getTotalExpensesForMonth(owner, month, year);

  res.status(200).json(new ApiResponse(200, {
    budget,
    totalExpenses,
    remainingBudget: budget.amount - totalExpenses,
    budgetExists: true,
  }, 'Budget retrieved successfully'));
});
