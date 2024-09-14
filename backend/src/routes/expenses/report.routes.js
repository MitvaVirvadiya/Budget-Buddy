import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middlewares.js";
import {
  getCategoryWiseExpenses,
  getCategoryWiseIncome,
  getDailyExpensesReport,
  getDailyIncomeReport,
  getIncomeFrequency,
  getMonthlyCategoryWiseExpenses,
  getMonthlyCategoryWiseIncome,
  getMonthlyExpensesSummary,
  getMonthlyIncomeFrequency,
  getMonthlyIncomeReport,
} from "../../controllers/expenses/report.controllers.js";

const router = Router();
router.use(verifyJWT);

router.route("/expenses/monthly").get(getMonthlyExpensesSummary);
router.route("/expenses/daily").get(getDailyExpensesReport);
router.route("/expenses/category-wise").get(getCategoryWiseExpenses);
router
  .route("/expenses/category-wise/monthly")
  .get(getMonthlyCategoryWiseExpenses);

router.route("/income/monthly").get(getMonthlyIncomeReport);
router.route("/income/daily").get(getDailyIncomeReport);
router.route("/income/category-wise").get(getCategoryWiseIncome);
router.route("/income/category-wise/monthly").get(getMonthlyCategoryWiseIncome);
router.route("/income/frequency").get(getIncomeFrequency);
router.route("/income/frequency/monthly").get(getMonthlyIncomeFrequency);

export default router;
