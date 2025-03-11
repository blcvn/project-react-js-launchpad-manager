import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/slice.js";
import userReducer from "./features/user/slice.js";
import projectReducer from "./features/project/slice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    project: projectReducer,
  },
});
