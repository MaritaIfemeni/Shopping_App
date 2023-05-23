import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { Product } from "../../types/Product";
import { NewProduct } from "../../types/NewProduct";
import { UpdatedProduct } from "../../types/UpdatedProduct";

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

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product: UpdatedProduct): Promise<Product | AxiosError> => {
    try {
      const { data } = await axios.put<Product>(
        `https://api.escuelajs.co/api/v1/products/${product.id}`,
        product.data
      );
      return data;
    } catch (e) {
      let error = e as AxiosError;
      throw new Error(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: number): Promise<{ result: boolean; id: number } | AxiosError> => {
    try {
      const { data } = await axios.delete(
        `https://api.escuelajs.co/api/v1/products/${id}`
      );
      return { result: data, id: id };
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
        state.error = "Failed fetch products";
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
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message;
        } else {
          const { result, id } = action.payload;
          if (result) {
            state.products = state.products.filter((item) => item.id !== id);
          } else {
            state.error = "Failed to delete the product";
          }
        }
        state.loading = false;
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to delete the product";
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message;
        } else {
          const product = action.payload;
          state.products = state.products.map((item) =>
            item.id === product.id ? product : item
          );
        }
        state.loading = false;
      });
  },
});

const productsReducer = productsSlice.reducer;
export const { cleanUpProductReducer, filterProductsByPrice } =
  productsSlice.actions;
export default productsReducer;
