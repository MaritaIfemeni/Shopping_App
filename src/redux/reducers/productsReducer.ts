import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { Product } from "../../types/Product";
import { NewProduct } from "../../types/NewProduct";

const initialState: {
  products: Product[];
  loading: boolean;
  error: string;
} = {
  products: [],
  loading: false,
  error: "",
};

export const fetchAllProducts = createAsyncThunk(
  "fetcAllProducts",
  async () => {
    try {
      const result = await axios.get<Product[]>(
        "https://api.escuelajs.co/api/v1/products/"
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const createNewProduct = createAsyncThunk(
  "products/createProduct",
  async (product: NewProduct) => {
    try {
      const result = await axios.post<Product>(
        "https://api.escuelajs.co/api/v1/products/",
        product
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      throw new Error(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    cleanUpProductReducer: (state) => {
      return initialState;
    },
    filterProductsByPrice: (state, action: PayloadAction<number>) => {
      const sortedProducts = [...state.products].sort((a, b) => {
        if (action.payload === 0) {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
      state.products = sortedProducts;
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
      })
      .addCase(createNewProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createNewProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to create product";
      });
  },
});

const productsReducer = productsSlice.reducer;
export const { cleanUpProductReducer, filterProductsByPrice } =
  productsSlice.actions;
export default productsReducer;
