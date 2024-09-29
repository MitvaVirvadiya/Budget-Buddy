import { Router } from "express";

import { verifyJWT } from "../../middlewares/auth.middlewares.js";
import {
  createBudget,
  deleteBudget,
  getBudget,
  updateBudget,
} from "../../controllers/expenses/budget.controllers.js";

const router = Router();

router.use(verifyJWT);

router.route("/").post(createBudget).get(getBudget);
router.route("/:year/:month").put(updateBudget).delete(deleteBudget);
export default router;
