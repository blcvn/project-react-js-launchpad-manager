import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "../../../api/auth";
import { notification } from "antd";
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
      return rejectWithValue(err.message);
    }
  }
);


export const loginWithGoogle = createAsyncThunk(
  "auth/login",
  async (values, { rejectWithValue }) => {
    try {
      const res = await authAPI.loginWithGoogle(values);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ user: res }));
      request.token = res.accessToken;
      notification.success({ message: "Login successful" });
      return res;
    } catch (err) {
      notification.error({ message: "Login failed", description: err.message });
      return rejectWithValue(err.message);
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
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      state.currentUser = null;
      state.status = "idle";
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
