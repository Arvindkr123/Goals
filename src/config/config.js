import dotenv from "dotenv";

dotenv.config();

export const { PORT, NODE_ENV, MONGO_URI } = process.env;
