import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middlewares.js";
import { exportExpensesCSV, exportIncomeCSV, getExpensesSummary, getIncomeSummary } from "../../controllers/expenses/dashboard.controllers.js";

const router = Router();
router.use(verifyJWT);

// Create a new expense
router.route("/expenses").get(getExpensesSummary);
router.route("/incomes").get(getIncomeSummary);

router.get("/export/expenses", exportExpensesCSV);
router.get("/export/income", exportIncomeCSV);

export default router;
