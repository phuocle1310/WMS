import { configureStore } from "@reduxjs/toolkit";
import language from "./language";
import userSlice from "./userSlice";
// import productSlice from "./productSlice";
import poSlice from "./poSlice";
const store = configureStore({
  reducer: {
    currentLanguage: language.reducer,
    user: userSlice.reducer,
    // product: productSlice.reducer,
    po: poSlice.reducer,
  },
});

export default store;
