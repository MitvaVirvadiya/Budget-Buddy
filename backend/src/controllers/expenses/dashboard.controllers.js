import Expense from "../../models/expenses/expense.models.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getCurrentMonthRange, getTodayRange } from "../../utils/Date.js";

// Summary of expenses for the logged-in user
export const getExpensesSummary = asyncHandler(async (req, res) => {
  // Get the logged-in user's ID (assumes user ID is available in req.user)
  const userId = req.user._id;

  const pipeline = [
    {
      // Filter the expenses by the logged-in user (owner)
      $match: {
        owner: userId, // Use the logged-in user's ID to match the owner field
      },
    },
    {
      $facet: {
        totalExpenses: [
          { $group: { _id: null, total: { $sum: "$amount" } } }
        ],
        currentMonthExpenses: [
          {
            $match: {
              createdAt: {
                $gte: getCurrentMonthRange().start,
                $lt: getCurrentMonthRange().end
              }
            }
          },
          { $group: { _id: null, total: { $sum: "$amount" } } }
        ],
        todayExpenses: [
          {
            $match: {
              createdAt: {
                $gte: getTodayRange().start,
                $lt: getTodayRange().end
              }
            }
          },
          { $group: { _id: null, total: { $sum: "$amount" } } }
        ]
      }
    },
    {
      $project: {
        totalExpenses: { $arrayElemAt: ["$totalExpenses.total", 0] },
        currentMonthExpenses: { $arrayElemAt: ["$currentMonthExpenses.total", 0] },
        todayExpenses: { $arrayElemAt: ["$todayExpenses.total", 0] }
      }
    }
  ];

  const result = await Expense.aggregate(pipeline);

  if (!result || result.length === 0) {
    throw new ApiError(404, "No expenses found for this user");
  }

  res.status(200).json(new ApiResponse(200, result[0], "Expenses summary retrieved successfully"));
});
