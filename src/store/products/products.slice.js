





import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    filteredProducts: [],
    products: [],
  },
  reducers: {
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload.filteredProducts;
      state.products = action.payload.products;
    },
  },
});

export const { setFilteredProducts } = productsSlice.actions;

export default productsSlice.reducer;






























// // import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// // import productsService from "../../services/productServices";

// // export const fetchProducts = createAsyncThunk(
// //   "products/fetchProducts",
// //   async () => {
// //     try {
// //       const response = await productsService.getList({});
// //       return response.data.products;

// //     }catch(error) {
// //         return error.message
// //     }
// //   }
// // );

// // const productSlice = createSlice({
// //   name: "products",
// //   initialState: {
// //     products: [],
// //     filteredProducts: [],
// //     status: "idle",
// //   },
// //   reducers: {
// //     setFilteredProducts: (state, { payload }) => {
// //       if (payload) {
// //         state.filteredProducts = state.products.filter((i) =>
// //           i.name.toLowerCase().includes(payload.toLowerCase())
// //         );
// //       } else {
// //         state.filteredProducts = state.products;
// //       }
// //     },
// //   },

// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(fetchProducts.pending, (state) => {
// //         state.status = "pending";
// //       })
// //       .addCase(fetchProducts.fulfilled, (state, { payload }) => {
// //         state.status = "fulfilled";
// //         state.products = payload;
// //         state.filteredProducts = payload;
// //       })
// //       .addCase(fetchProducts.rejected, (state) => {
// //         state.status = "failed";
// //       });
// //   },
// // });

// // export default productSlice.reducer;
// // export const { setFilteredProducts } = productSlice.actions;
