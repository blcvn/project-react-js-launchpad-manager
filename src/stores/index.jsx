import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/slice";
import projectReducer from "./features/project/slice";
import userReducer from "./features/user/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    project: projectReducer,
  },
});
