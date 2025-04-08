import { createAsyncThunk } from "@reduxjs/toolkit";
import projectAPI from "../../../api/project";
import { ProjectStatus } from "../../../constant/status";
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

export const queryProjectById = createAsyncThunk(
  `project/query-by-id`,
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await projectAPI.queryProjectById({
        projectId: id,
        isGetDetail: true,
      });
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const approveProjectForReview = createAsyncThunk(
  `project/approveProjectForReview`,
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await projectAPI.approveProjectForReview({
        projectId: id,
        status: ProjectStatus.REVIEWING,
      });
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const approveOnboarding = createAsyncThunk(
  `project/approveOnboarding`,
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await projectAPI.approveOnboarding({
        projectId: id,
        status: ProjectStatus.ONBOARD,
      });
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const rejectOnboard = createAsyncThunk(
  `project/rejectOnboarding`,
  async ({ id, text }, { rejectWithValue }) => {
    try {
      const res = await projectAPI.approveOnboarding({
        projectId: id,
        status: ProjectStatus.REJECTED_ONBOARD,
        rejectReviewReason: text,
      });
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const approveDone = createAsyncThunk(
  `project/approveDone`,
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await projectAPI.approveDone({
        projectId: id,
        status: ProjectStatus.DONE,
      });
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const rejectDone = createAsyncThunk(
  `project/rejectDone`,
  async ({ id, text }, { rejectWithValue }) => {
    try {
      const res = await projectAPI.approveDone({
        projectId: id,
        status: ProjectStatus.REJECTED_DONE,
        rejectDoneReason: text,
      });
      return res;
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
