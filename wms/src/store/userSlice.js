import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../api/userApi";

export const getMe = createAsyncThunk(
  "user/getMe",
  async (params, thunlApi) => {
    const currentUser = await userApi.getAuthInfo();
  },
);

//tạo ra uiSlice
const userSlice = createSlice({
  name: "user",
  initialState: { current: {}, error: false },
  reducers: {
    registered(state, action) {
      state.registerIsVisible = action.payload;
    },
  },
});

export const uiActions = userSlice.actions;

export default userSlice;
