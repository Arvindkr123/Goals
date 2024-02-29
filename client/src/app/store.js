import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import goalSlice from "../features/goals/goalSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    goal: goalSlice,
  },
});

export default store;
