import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../api/userApi";
//cookies
import cookies from "react-cookies";

export const getMe = createAsyncThunk(
  "user/getMe",
  async (params, thunlApi) => {
    const currentUser = await userApi.getUser();
    return currentUser;
  },
);
const token = () => {
  const token = cookies.load("access-token");
  console.log(token);
  return token;
};
//tạo ra uiSlice
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {},
    error: false,
    loading: true,
    isLoggedIn: token === "" ? false : true,
  },
  reducers: {
    logout(state) {
      //lưu vô cookie
      cookies.save("access-token", "");
      state.currentUser = {};
      state.loading = true;
      state.error = false;
      const token = cookies.load("access-token");
      token === "" ? (state.isLoggedIn = false) : (state.isLoggedIn = true);
    },
  },
  extraReducers: {
    [getMe.pending]: (state) => {
      state.loading = true;
      state.isLoggedIn = false;
    },
    [getMe.rejected]: (state) => {
      state.loading = true;
      state.error = true;
      state.isLoggedIn = false;
    },
    [getMe.fulfilled]: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      const token = cookies.load("access-token");
      token === "" ? (state.isLoggedIn = false) : (state.isLoggedIn = true);
    },
  },
});

export const uiActions = userSlice.actions;

export default userSlice;
