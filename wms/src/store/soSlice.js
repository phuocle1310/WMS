import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import soApi from "../api/soApi";
import moment from "moment";
//thêm
export const addRequestSo = createAsyncThunk(
  "so/addRequestPo",
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
  "so/getAll",
  async (data, { rejectWithValue }) => {
    try {
      const response = await soApi.getAllSo(data);
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
      state.listSo = action.payload.results.map((item) => {
        return {
          ...item,
          add_date: moment(item.add_date).format("L, h:mm"),
          effective_date: moment(item.effective_date).format("L"),
        };
      });
      state.rowCount = action.payload.count;
      state.pageSize = Math.ceil(state.rowCount / state.listSo.length);
    },
  },
});

export const soActions = soSlice.actions;

export default soSlice;
