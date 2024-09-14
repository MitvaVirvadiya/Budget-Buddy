import Expense from "../../models/expenses/expense.models.js";
import Income from "../../models/expenses/income.models.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { startOfYear, endOfYear, startOfMonth, endOfMonth } from "date-fns";

export const getMonthlyExpensesSummary = asyncHandler(async (req, res) => {
  // Get the logged-in user's ID
  const userId = req.user._id;

  // Get year from query params or default to the current year
  const year = parseInt(req.query.year) || new Date().getFullYear();

  // Pipeline to aggregate data
  const pipeline = [
    {
      // Filter the expenses by the logged-in user
      $match: {
        owner: userId,
        createdAt: {
          $gte: startOfYear(new Date(year, 0, 1)),
          $lt: endOfYear(new Date(year, 11, 31)),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        total: { $sum: "$amount" },
      },
    },
    {
      $project: {
        month: "$_id",
        total: 1,
        _id: 0,
      },
    },
  ];

  const result = await Expense.aggregate(pipeline);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        result,
        "Monthly expenses data retrieved successfully"
      )
    );
});

export const getDailyExpensesReport = asyncHandler(async (req, res) => {
  // Get the logged-in user's ID
  const userId = req.user._id;

  // Get year and month from query params or default to the current year and month
  const year = parseInt(req.query.year) || new Date().getFullYear();
  const month = parseInt(req.query.month) || new Date().getMonth() + 1;

  // Calculate start and end dates for the month
  const start = startOfMonth(new Date(year, month - 1));
  const end = endOfMonth(new Date(year, month - 1));

  // Pipeline to aggregate data
  const pipeline = [
    {
      // Filter the expenses by the logged-in user
      $match: {
        owner: userId,
        createdAt: {
          $gte: start,
          $lt: end,
        },
      },
    },
    {
      $group: {
        _id: { $dayOfMonth: "$createdAt" },
        total: { $sum: "$amount" },
      },
    },
    {
      $project: {
        day: "$_id",
        total: 1,
        _id: 0,
      },
    },
  ];

  const result = await Expense.aggregate(pipeline);

  res
    .status(200)
    .json(
      new ApiResponse(200, result, "Daily expenses data retrieved successfully")
    );
});

export const getCategoryWiseExpenses = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const pipeline = [
    {
      $match: {
        owner: userId,
      },
    },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
    {
      $project: {
        category: "$_id",
        total: 1,
        _id: 0,
      },
    },
  ];

  const result = await Expense.aggregate(pipeline);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        result,
        "Category-wise expenses data retrieved successfully"
      )
    );
});

export const getMonthlyCategoryWiseExpenses = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Get year and month from query params or default to the current year and month
  const year = parseInt(req.query.year) || new Date().getFullYear();
  const month = parseInt(req.query.month) || new Date().getMonth() + 1;

  // Calculate start and end dates for the month
  const start = startOfMonth(new Date(year, month - 1));
  const end = endOfMonth(new Date(year, month - 1));

  const pipeline = [
    {
      $match: {
        owner: userId,
        createdAt: {
          $gte: start,
          $lt: end,
        },
      },
    },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
    {
      $project: {
        category: "$_id",
        total: 1,
        _id: 0,
      },
    },
  ];

  const result = await Expense.aggregate(pipeline);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        result,
        "Monthly category-wise expenses data retrieved successfully"
      )
    );
});

export const getMonthlyIncomeReport = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Extract year from query parameters or default to current year
  const year = req.query.year
    ? parseInt(req.query.year, 10)
    : new Date().getFullYear();

  const pipeline = [
    {
      $match: {
        owner: userId,
        receivedDate: {
          $gte: new Date(year, 0, 1), // January 1st of the year
          $lt: new Date(year + 1, 0, 1), // January 1st of the next year
        },
      },
    },
    {
      $group: {
        _id: { $month: "$receivedDate" },
        total: { $sum: "$amount" },
      },
    },
    {
      $project: {
        month: "$_id",
        total: 1,
        _id: 0,
      },
    },
    {
      $sort: { month: 1 }, // Optional: Sort by month
    },
  ];

  const result = await Income.aggregate(pipeline);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        result,
        "Month-wise income data retrieved successfully"
      )
    );
});

export const getDailyIncomeReport = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Extract month and year from query parameters or default to current month and year
  const month = req.query.month
    ? parseInt(req.query.month, 10)
    : new Date().getMonth() + 1;
  const year = req.query.year
    ? parseInt(req.query.year, 10)
    : new Date().getFullYear();

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);

  const pipeline = [
    {
      $match: {
        owner: userId,
        receivedDate: {
          $gte: startDate,
          $lt: endDate,
        },
      },
    },
    {
      $group: {
        _id: { $dayOfMonth: "$receivedDate" },
        total: { $sum: "$amount" },
      },
    },
    {
      $project: {
        day: "$_id",
        total: 1,
        _id: 0,
      },
    },
    {
      $sort: { day: 1 }, // Optional: Sort by day
    },
  ];

  const result = await Income.aggregate(pipeline);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        result,
        "Day-wise income data retrieved successfully"
      )
    );
});

export const getCategoryWiseIncome = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const pipeline = [
    {
      $match: {
        owner: userId,
      },
    },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
    {
      $project: {
        category: "$_id",
        total: 1,
        _id: 0,
      },
    },
  ];

  const result = await Income.aggregate(pipeline);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        result,
        "Category-wise income data retrieved successfully"
      )
    );
});

export const getMonthlyCategoryWiseIncome = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Get year and month from query params or default to the current year and month
  const year = parseInt(req.query.year) || new Date().getFullYear();
  const month = parseInt(req.query.month) || new Date().getMonth() + 1;

  // Calculate start and end dates for the month
  const start = startOfMonth(new Date(year, month - 1));
  const end = endOfMonth(new Date(year, month - 1));

  const pipeline = [
    {
      $match: {
        owner: userId,
        receivedDate: {
          $gte: start,
          $lt: end,
        },
      },
    },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
    {
      $project: {
        category: "$_id",
        total: 1,
        _id: 0,
      },
    },
  ];

  const result = await Income.aggregate(pipeline);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        result,
        "Monthly category-wise income data retrieved successfully"
      )
    );
});

export const getIncomeFrequency = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const pipeline = [
    {
      $match: {
        owner: userId,
      },
    },
    {
      $facet: {
        totalIncome: [
          {
            $group: {
              _id: null,
              totalRecurring: {
                $sum: {
                  $cond: [{ $eq: ["$recurring", true] }, "$amount", 0],
                },
              },
              totalNonRecurring: {
                $sum: {
                  $cond: [{ $eq: ["$recurring", false] }, "$amount", 0],
                },
              },
            },
          },
        ],
        monthlyIncome: [
          {
            $match: {
              receivedDate: {
                $gte: startOfMonth(new Date()),
                $lt: endOfMonth(new Date()),
              },
            },
          },
          {
            $group: {
              _id: null,
              totalRecurring: {
                $sum: {
                  $cond: [{ $eq: ["$recurring", true] }, "$amount", 0],
                },
              },
              totalNonRecurring: {
                $sum: {
                  $cond: [{ $eq: ["$recurring", false] }, "$amount", 0],
                },
              },
            },
          },
        ],
      },
    },
    {
      $project: {
        totalIncome: {
          recurring: { $arrayElemAt: ["$totalIncome.totalRecurring", 0] },
          nonRecurring: {
            $arrayElemAt: ["$totalIncome.totalNonRecurring", 0],
          },
        },
        monthlyIncome: {
          recurring: { $arrayElemAt: ["$monthlyIncome.totalRecurring", 0] },
          nonRecurring: {
            $arrayElemAt: ["$monthlyIncome.totalNonRecurring", 0],
          },
        },
      },
    },
  ];

  const result = await Income.aggregate(pipeline);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        result[0],
        "Recurring vs non-recurring income data retrieved successfully"
      )
    );
});

export const getMonthlyIncomeFrequency = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Extract month and year from query parameters or default to current month and year
  const month = req.query.month
    ? parseInt(req.query.month, 10)
    : new Date().getMonth() + 1;
  const year = req.query.year
    ? parseInt(req.query.year, 10)
    : new Date().getFullYear();

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);

  const pipeline = [
    {
      $match: {
        owner: userId,
        receivedDate: {
          $gte: startDate,
          $lt: endDate,
        },
      },
    },
    {
      $facet: {
        recurringIncome: [
          { $match: { recurring: true } },
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ],
        nonRecurringIncome: [
          { $match: { recurring: false } },
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ],
      },
    },
    {
      $project: {
        recurringIncome: { $arrayElemAt: ["$recurringIncome.total", 0] },
        nonRecurringIncome: { $arrayElemAt: ["$nonRecurringIncome.total", 0] },
      },
    },
  ];

  const result = await Income.aggregate(pipeline);

  if (!result || result.length === 0) {
    throw new ApiError(404, "No income data found for this user");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        result[0],
        "Recurring vs. Non-Recurring income data retrieved successfully"
      )
    );
});
