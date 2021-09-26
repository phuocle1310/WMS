import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import poApi from "../api/poApi";

//thêm
export const addRequestPo = createAsyncThunk(
  "po/addRequestPo",
  async (data, { rejectWithValue }) => {
    try {
      const response = await poApi.createRequestPo(data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
//getList
export const listPo = createAsyncThunk(
  "po",
  async (data, { rejectWithValue }) => {
    try {
      const response = await poApi.getAllPo(data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
//tạo ra poSlice
const poSlice = createSlice({
  name: "po",
  initialState: {
    listPo: [],
    pageSize: 0,
    rowCount: 0,
  },
  reducers: {},
  extraReducers: {
    [addRequestPo.fulfilled]: (state, action) => {
       state.listPo.push(action.payload);
    },
    [listPo.fulfilled]: (state, action) => {
      state.listPo = action.payload.results;
      state.rowCount = action.payload.count;
      state.pageSize = Math.ceil(state.rowCount / state.listPo.length);
    },
  },
});

export const poActions = poSlice.actions;

export default poSlice;
