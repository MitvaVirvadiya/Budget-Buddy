import Expense from "../../models/expenses/expense.models.js";
import Income from "../../models/expenses/income.models.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getCurrentMonthRange, getTodayRange } from "../../utils/Date.js";
import { Parser } from 'json2csv';

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
        totalExpenses: [{ $group: { _id: null, total: { $sum: "$amount" } } }],
        currentMonthExpenses: [
          {
            $match: {
              createdAt: {
                $gte: getCurrentMonthRange().start,
                $lt: getCurrentMonthRange().end,
              },
            },
          },
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ],
        todayExpenses: [
          {
            $match: {
              createdAt: {
                $gte: getTodayRange().start,
                $lt: getTodayRange().end,
              },
            },
          },
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ],
      },
    },
    {
      $project: {
        totalExpenses: { $arrayElemAt: ["$totalExpenses.total", 0] },
        currentMonthExpenses: {
          $arrayElemAt: ["$currentMonthExpenses.total", 0],
        },
        todayExpenses: { $arrayElemAt: ["$todayExpenses.total", 0] },
      },
    },
  ];

  const result = await Expense.aggregate(pipeline);

  if (!result || result.length === 0) {
    throw new ApiError(404, "No expenses found for this user");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, result[0], "Expenses summary retrieved successfully")
    );
});

// Summary of income for the logged-in user
export const getIncomeSummary = asyncHandler(async (req, res) => {
  // Get the logged-in user's ID (assumes user ID is available in req.user)
  const userId = req.user._id;

  // Utility functions to get date ranges
  const getCurrentMonthRange = () => {
    const start = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    return { start, end };
  };

  const getTodayRange = () => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(start.getDate() + 1);

    return { start, end };
  };

  const pipeline = [
    {
      // Filter the incomes by the logged-in user (owner)
      $match: {
        owner: userId, // Use the logged-in user's ID to match the owner field
      },
    },
    {
      $facet: {
        totalIncome: [{ $group: { _id: null, total: { $sum: "$amount" } } }],
        currentMonthIncome: [
          {
            $match: {
              receivedDate: {
                $gte: getCurrentMonthRange().start,
                $lt: getCurrentMonthRange().end,
              },
            },
          },
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ],
        todayIncome: [
          {
            $match: {
              receivedDate: {
                $gte: getTodayRange().start,
                $lt: getTodayRange().end,
              },
            },
          },
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ],
      },
    },
    {
      $project: {
        totalIncome: { $arrayElemAt: ["$totalIncome.total", 0] },
        currentMonthIncome: { $arrayElemAt: ["$currentMonthIncome.total", 0] },
        todayIncome: { $arrayElemAt: ["$todayIncome.total", 0] },
      },
    },
  ];

  const result = await Income.aggregate(pipeline);

  if (!result || result.length === 0) {
    throw new ApiError(404, "No income found for this user");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, result[0], "Income summary retrieved successfully")
    );
});


export const exportExpensesCSV = async (req, res) => {
  try {
    const expenses = await Expense.find({ owner: req.user.id });

    // Define the fields for the CSV
    const fields = ['name', 'category', 'description', 'amount', 'createdAt'];
    const opts = { fields };

    // Convert the expense data to CSV
    const parser = new Parser(opts);
    const csv = parser.parse(expenses);

    // Set the appropriate headers for CSV file
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=expenses.csv');    

    // Send the CSV data as the response
    res.status(200).end(csv);
  } catch (error) {
    res.status(500).json({ message: 'Error exporting expenses' });
  }
};

export const exportIncomeCSV = async (req, res) => {
  try {
    const incomes = await Income.find({ owner: req.user.id });

    // Define the fields for the CSV
    const fields = ['source', 'category', 'amount', 'description', 'receivedDate'];
    const opts = { fields };

    // Convert the income data to CSV
    const parser = new Parser(opts);
    const csv = parser.parse(incomes);

    console.log('csv', csv)

    // Set the appropriate headers for CSV file
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=income.csv');

    // Send the CSV data as the response
    res.status(200).end(csv);
  } catch (error) {
    res.status(500).json({ message: 'Error exporting income' });
  }
};

