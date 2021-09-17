import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import language from "./language";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    currentLanguage: language.reducer,
    user: userSlice.reducer,
  },
});

export default store;
