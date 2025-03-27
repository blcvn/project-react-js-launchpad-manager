import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createAsyncCRUD = (api, actionType) => {
  return {
    fetchAll: createAsyncThunk(
      `${actionType}/fetchAll`,
      async (_, { getState, rejectWithValue }) => {
        try {
          const state = getState();
          const res = await api.getAll(state[actionType].params);
          return { data: res.data, totalElements: res.total };
        } catch (err) {
          return rejectWithValue(err);
        }
      }
    ),
    fetchById: createAsyncThunk(
      `${actionType}/fetchById`,
      async (id, { rejectWithValue }) => {
        try {
          const res = await api.getById(id);
          return res;
        } catch (err) {
          return rejectWithValue(err);
        }
      }
    ),
    create: createAsyncThunk(
      `${actionType}/create`,
      async (item, { rejectWithValue }) => {
        try {
          const res = await api.create(item);
          return res;
        } catch (err) {
          return rejectWithValue(err);
        }
      }
    ),
    update: createAsyncThunk(
      `${actionType}/update`,
      async (item, { rejectWithValue }) => {
        try {
          const res = await api.update(item);
          return res;
        } catch (err) {
          return rejectWithValue(err);
        }
      }
    ),
    remove: createAsyncThunk(
      `${actionType}/remove`,
      async (id, { rejectWithValue }) => {
        try {
          await api.delete(id);
          return id;
        } catch (err) {
          return rejectWithValue(err);
        }
      }
    ),
  };
};

export const createCommonSlice = ({
  name = "",
  initialState = {
    data: [],
    params: { page: 0, size: 10 },
    totalElements: 0,
    detail: null,
    status: "idle",
    error: null,
  },
  reducers = {},
  extraReducers = null,
  api = null,
}) => {
  const crudActions = api ? createAsyncCRUD(api, name) : null;

  return {
    slice: createSlice({
      name,
      initialState,
      reducers: {
        setParams: (state, action) => {
          state.params = action.payload;
        },
        ...reducers,
      },
      extraReducers: (builder) => {
        if (crudActions) {
          builder
            .addCase(crudActions.fetchAll.pending, (state) => {
              state.status = "loading";
            })
            .addCase(crudActions.fetchAll.fulfilled, (state, action) => {
              state.status = "succeeded";
              state.data = action.payload.data;
              state.totalElements = action.payload.totalElements;
            })
            .addCase(crudActions.fetchAll.rejected, (state, action) => {
              state.status = "failed";
              state.error = action.payload;
            })
            .addCase(crudActions.fetchById.fulfilled, (state, action) => {
              state.detail = action.payload;
            })
            .addCase(crudActions.create.fulfilled, (state, action) => {
              state.data.push(action.payload);
            })
            .addCase(crudActions.update.fulfilled, (state, action) => {
              const index = state.data.findIndex(
                (item) => item.id === action.payload.id
              );
              if (index !== -1) {
                state.data[index] = action.payload;
              }
            })
            .addCase(crudActions.remove.fulfilled, (state, action) => {
              state.data = state.data.filter(
                (item) => item.id !== action.payload
              );
            });
        }

        if (extraReducers) {
          extraReducers(builder);
        }
      },
    }),
    actions: crudActions,
  };
};
