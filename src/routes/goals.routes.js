import { Router } from "express";
import {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
} from "../controllers/goal.controller.js";

const router = Router();

router.route("/goals").get(getGoals).post(setGoals);
router.route("/goals/:id").put(updateGoals).delete(deleteGoals);

export default router;
