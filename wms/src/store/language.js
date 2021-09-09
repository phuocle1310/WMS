import { createSlice } from "@reduxjs/toolkit";

//tạo ra Slice language
const language = createSlice({
  name: "ui",
  initialState: { currentLanguage: "vn" },
  reducers: {
    registered(state, action) {
      state.currentLanguage = action.payload;
    },
  },
});

export const languageActions = language.actions;

export default language;
