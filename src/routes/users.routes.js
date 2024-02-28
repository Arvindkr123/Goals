import { Router } from "express";
import {
  registerController,
  loginController,
  getCurrentUserController,
} from "../controllers/users.controllers.js";
import protect from "../middleware/auth.middleware.js";

const router = Router();

router.route("/").post(registerController);
router.route("/login").post(loginController);
router.route("/me").get(protect, getCurrentUserController);

export default router;
