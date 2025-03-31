import { createAsyncThunk } from "@reduxjs/toolkit";
import projectAPI from "../../../api/project";
import { createCommonSlice } from "../../common";



export const approveProjectForOnboarding = createAsyncThunk(
  `project/submit`,
  async (id, { rejectWithValue }) => {
    try {
      return id;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
)
export const rejectProject = createAsyncThunk(
  `project/reject`,
  async (id, { rejectWithValue }) => {
    try {
      return id;
    } catch (err) {
      return rejectWithValue(err);
    }
  })


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
});
export const { fetchAll, create, update, remove, fetchById } =
  projectSlice.actions;

export const { setParams } = projectSlice.slice.actions;
export default projectSlice.slice.reducer;
