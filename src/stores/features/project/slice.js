import { createAsyncThunk } from "@reduxjs/toolkit";
import projectAPI from "../../../api/project";
import { createCommonSlice } from "../../common";
export const approveProjectForReview = createAsyncThunk(
  `project/edit`,
  async ({ id, body }, { rejectWithValue }) => {
    try {
      await projectAPI.approveProjectForReview(id, body);
      return id;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const approveProjectForOnboarding = createAsyncThunk(
  `project/submit`,
  async (id, { rejectWithValue }) => {
    try {
      await projectAPI.approveProjectForOnboarding(id);
      return id;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const rejectProject = createAsyncThunk(
  `project/complete`,
  async (id, { rejectWithValue }) => {
    try {
      await projectAPI.rejectProject(id);
      return id;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const projectSlice = createCommonSlice({
  name: "project",
  api: projectAPI,
});
export const { fetchAll, create, update, remove, fetchById } =
  projectSlice.actions;

export const { setParams } = projectSlice.slice.actions;
export default projectSlice.slice.reducer;
