import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { JWT_SECRET } from "../config/config.js";
import userModel from "../models/users.models.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from headers
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      // get the user now
      req.user = await userModel.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authenticated");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("not authenticated, no token");
  }
});

export default protect;
