import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import projectAPI from "../../../api/project";

export const search = createAsyncThunk(
  "project/search",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { params } = getState().project;
      const res = await projectAPI.search(params);
      return res;
    } catch (err) {
      notification.error({
        message: "Search failed",
        description: err.message,
      });
      return rejectWithValue(err.message);
    }
  }
);

export const create = createAsyncThunk(
  "project/create",
  async (values, { dispatch, rejectWithValue }) => {
    try {
      const res = await projectAPI.create(values);
      notification.success({
        message: "Project created successfully",
      });
      dispatch(search());
      return res;
    } catch (err) {
      notification.error({
        message: "Create failed",
        description: err.message,
      });
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  data: [],
  totalElements: 0,
  params: { page: 0, size: 10 },
  status: "idle",
  error: null,
};

export const authSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setParams: (state, action) => {
      state.params = { ...state.params, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(search.pending, (state) => {
        state.status = "loading";
      })
      .addCase(search.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
        state.totalElements = action.payload.total;
      })
      .addCase(search.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setParams } = authSlice.actions;
export default authSlice.reducer;
