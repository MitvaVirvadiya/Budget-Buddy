import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middlewares.js";
import {
  createIncome,
  deleteIncome,
  getIncomeById,
  getIncomes,
  updateIncome,
} from "../../controllers/expenses/income.controllers.js";

const router = Router();

router.use(verifyJWT);

router.route("/").post(createIncome).get(getIncomes);

router.route("/:id").get(getIncomeById).put(updateIncome).delete(deleteIncome);

export default router;
