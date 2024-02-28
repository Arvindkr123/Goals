import express from "express";
import goalRoutes from "./routes/goals.routes.js";
import { errorHandler } from "./middleware/errorHandler.middleware.js";
import usersRoutes from "./routes/users.routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", goalRoutes);
app.use("/api/users", usersRoutes);
app.use(errorHandler);

export default app;
