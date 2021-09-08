import { createSlice } from "@reduxjs/toolkit";

//tạo ra uiSlice
const uiSlice = createSlice({
  name: "ui",
  initialState: { registerIsVisible: false },
  reducers: {
    registered(state, action) {
      state.registerIsVisible = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
