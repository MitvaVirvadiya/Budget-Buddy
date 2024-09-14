import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middlewares.js";
import { getExpensesSummary, getIncomeSummary } from "../../controllers/expenses/dashboard.controllers.js";

const router = Router();
router.use(verifyJWT);

// Create a new expense
router.route("/expenses").get(getExpensesSummary);
router.route("/incomes").get(getIncomeSummary);

export default router;
