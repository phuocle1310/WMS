import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import language from "./language";

const store = configureStore({
  reducer: { ui: uiSlice.reducer, currentLanguage: language.reducer },
});

export default store;
