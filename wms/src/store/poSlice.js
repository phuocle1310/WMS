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
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  },
);
//getList
export const listPo = createAsyncThunk(
  "po",
  async (data, { rejectWithValue }) => {
    try {
      const response = await poApi.createRequestPo(data);
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
  },
  reducers: {},
  extraReducers: {
    [addRequestPo.fulfilled]: (state, action) => {
      state.listPo.push(action.payload);
    },
  },
});

export const poActions = poSlice.actions;

export default poSlice;
