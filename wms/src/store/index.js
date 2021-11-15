import { configureStore } from "@reduxjs/toolkit";
import language from "./language";
import userSlice from "./userSlice";
import soSlice from "./soSlice";
import poSlice from "./poSlice";
const store = configureStore({
  reducer: {
    currentLanguage: language.reducer,
    user: userSlice.reducer,
    po: poSlice.reducer,
    so: soSlice.reducer,
  },
});

export default store;
