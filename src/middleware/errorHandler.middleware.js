import { NODE_ENV } from "../config/config.js";

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode ? err.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: NODE_ENV === "production" ? null : err.stack,
  });
};
