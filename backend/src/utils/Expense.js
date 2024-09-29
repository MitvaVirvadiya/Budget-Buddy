import Expense from "../models/expenses/expense.models.js";

/**
 * Function to calculate total expenses for a user for a specific month and year.
 * @param {ObjectId} userId - ID of the user
 * @param {Number} month - The month (0-based, January is 0)
 * @param {Number} year - The year (4 digits)
 * @returns {Number} Total expenses for the given month and year
 */
export const getTotalExpensesForMonth = async (userId, month, year) => {
  console.log("month", month);
  console.log("year", year);
  console.log("userId", userId);

  const startDate = new Date(year, month - 1, 1); // Start of the month at 00:00:00
  const endDate = new Date(year, month, 0, 23, 59, 59); // End of the month at 23:59:59
  console.log("Start Date:", startDate);
  console.log("End Date:", endDate);

  const totalExpenses = await Expense.aggregate([
    {
      $match: {
        owner: userId,
        createdAt: {
          $gte: startDate, // Log this value
          $lt: endDate, // Log this value
        },
      },
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" },
      },
    },
  ]);
  
  return totalExpenses.length ? totalExpenses[0].totalAmount : 0;
};
