import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middlewares.js";
import { getExpensesSummary } from "../../controllers/expenses/dashboard.controllers.js";

const router = Router();
router.use(verifyJWT);

// Create a new expense
router.route("/").get(getExpensesSummary);

export default router;
