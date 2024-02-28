import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "90d",
  });
};

export default generateToken;
