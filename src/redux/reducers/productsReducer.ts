import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { Product } from "../../types/Product";

const initialState: {
    products: Product[];
    currentPage: number;
    loading: boolean;
    error: string;
  } = {
    products: [],
    currentPage: 1,
    loading: false,
    error: "",
  };

  export const fetchAllProducts = createAsyncThunk(
    "fetcAllProducts",
    async (page: number) => {
      try {
        const result = await axios.get<Product[]>(
          `https://api.escuelajs.co/api/v1/products?offset=${page}&limit=10`
        );
        return result.data; 
      } catch (e) {
        const error = e as AxiosError;
        return error;
      }
    }
  );
  
  const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
      createProduct: (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
      },
      setCurrentPage: (state, action: PayloadAction<number>) => {
        state.currentPage = action.payload;
      },
  
    },
    extraReducers: (build) => {
      build
        .addCase(fetchAllProducts.fulfilled, (state, action) => {
          if (action.payload instanceof AxiosError) {
            state.error = action.payload.message;
          } else {
            state.products = action.payload;
          }
          state.loading = false;
        })
        .addCase(fetchAllProducts.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(fetchAllProducts.rejected, (state, action) => {
          state.error = "Cannot fetch products";
        });
    },
  });
  
  const productsReducer = productsSlice.reducer;
  export const { createProduct, setCurrentPage } =
    productsSlice.actions;
  export default productsReducer;
  