import { Router } from "express";
import {
  createExpense,
  deleteExpense,
  getExpenseById,
  getExpenses,
  updateExpense,
} from "../../controllers/expenses/expense.controllers.js";
import { verifyJWT } from "../../middlewares/auth.middlewares.js";

const router = Router();

// Create a new expense
router.post("/", verifyJWT, createExpense);

// Get all expenses
router.get("/", verifyJWT, getExpenses);

// Get an expense by ID
router.get("/:id", verifyJWT, getExpenseById);

// Update an expense
router.put("/:id", verifyJWT, updateExpense);

// Delete an expense
router.delete("/:id", verifyJWT, deleteExpense);

export default router;
