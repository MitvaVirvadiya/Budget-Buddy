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

router.use(verifyJWT);

router.route("/").post(createExpense).get(getExpenses);

router
  .route("/:id")
  .get(getExpenseById)
  .put(updateExpense)
  .delete(deleteExpense);

export default router;
