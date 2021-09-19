// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import productApi from "../api/productApi";

// export const getProductBySupplier = createAsyncThunk(
//   "product/getProductBySupplier",
//   async (params, thunlApi) => {
//     const listProductBySupplier = await productApi.getProductBySupplier();
//     return listProductBySupplier.results;
//   },
// );

// const productSlice = createSlice({
//   name: "product",
//   initialState: {
//     listProductBySupplier: [],
//     error: false,
//     loading: true,
//   },
//   reducers: {},
//   extraReducers: {
//     [getProductBySupplier.pending]: (state) => {
//       state.loading = true;
//     },
//     [getProductBySupplier.rejected]: (state) => {
//       state.loading = true;
//       state.error = true;
//     },
//     [getProductBySupplier.fulfilled]: (state, action) => {
//       state.loading = false;
//       state.listProductBySupplier = action.payload;
//     },
//   },
// });

// export const productActions = productSlice.actions;

// export default productSlice;
