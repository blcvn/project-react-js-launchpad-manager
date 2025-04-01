import { createAsyncThunk } from "@reduxjs/toolkit";
import projectAPI from "../../../api/project";
import { createCommonSlice } from "../../common";

export const queryProject = createAsyncThunk(
  `project/query`,
  async (body, { rejectWithValue }) => {
    try {
      const res = await projectAPI.queryProject(body);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const approveProjectForOnboarding = createAsyncThunk(
  `project/submit`,
  async (id, { rejectWithValue }) => {
    try {
      return id;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const rejectProject = createAsyncThunk(
  `project/reject`,
  async (id, { rejectWithValue }) => {
    try {
      return id;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const completeProject = createAsyncThunk(
  `project/complete`,
  async (id, { rejectWithValue }) => {
    try {
      return id;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const projectSlice = createCommonSlice({
  name: "project",
  api: projectAPI,
  extraReducers: (builder) => {
    builder
      .addCase(queryProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(queryProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.projects;
      })
      .addCase(queryProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { fetchAll, create, update, remove, fetchById } =
  projectSlice.actions;

export const { setParams } = projectSlice.slice.actions;
export default projectSlice.slice.reducer;
