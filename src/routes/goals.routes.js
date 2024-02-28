import { Router } from "express";
import {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
} from "../controllers/goal.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = Router();

router.route("/goals").get(protect, getGoals).post(protect, setGoals);
router
  .route("/goals/:id")
  .put(protect, updateGoals)
  .delete(protect, deleteGoals);

export default router;
