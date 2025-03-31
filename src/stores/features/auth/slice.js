import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import authAPI from "../../../api/auth";
import { LOCAL_STORAGE_KEY } from "../../../constant/key";
import request from "../../../utils/request";

const loadUserFromLocalStorage = () => {
  const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (storedData) {
    const user = JSON.parse(storedData).user;
    request.token = user.accessToken;
    return user;
  } else {
    return null;
  }
};

export const login = createAsyncThunk(
  "auth/login",
  async (values, { rejectWithValue }) => {
    try {
      const res = await authAPI.login(values);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ user: res }));
      request.token = res.accessToken;
      notification.success({ message: "Login successful" });
      return res;
    } catch (err) {
      notification.error({ message: "Login failed", description: err.message });
      return rejectWithValue(err);
    }
  }
);


export const loginWithGoogle = createAsyncThunk(
  "auth/login-with-google",
  async (values, { rejectWithValue }) => {
    try {
      const res = await authAPI.loginWithGoogle(values);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ user: res }));
      request.token = res.accessToken;
      notification.success({ message: "Login successful" });
      return res;
    } catch (err) {
      notification.error({ message: "Login failed", description: err.message });
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  currentUser: loadUserFromLocalStorage(),
  status: "idle",
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.currentUser = null;
      state.status = "idle";
      window.location.href = "/sign-in";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
