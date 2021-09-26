import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import soApi from "../api/soApi";

//thêm
export const addRequestSo = createAsyncThunk(
  "po/addRequestPo",
  async (data, { rejectWithValue }) => {
    try {
      const response = await soApi.createRequestSo(data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
//getList
export const listSo = createAsyncThunk(
  "po",
  async (data, { rejectWithValue }) => {
    try {
      const response = await soApi.getAllSo();
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
//tạo ra poSlice
const soSlice = createSlice({
  name: "so",
  initialState: {
    listSo: [],
    pageSize: 0,
    rowCount: 0,
  },
  reducers: {},
  extraReducers: {
    [addRequestSo.fulfilled]: (state, action) => {
      state.listSo.push(action.payload);
    },
    [listSo.fulfilled]: (state, action) => {
      state.listSo = action.payload.results;
      state.rowCount = action.payload.count;
      state.pageSize = Math.ceil(state.rowCount / state.listSo.length);
    },
  },
});

export const soActions = soSlice.actions;

export default soSlice;
