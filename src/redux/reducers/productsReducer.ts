import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  isAnyOf,
  isRejectedWithValue,
  isFulfilled,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { Product } from "../../types/Product";
import { NewProduct } from "../../types/NewProduct";
import { UpdatedProduct } from "../../types/UpdatedProduct";
import {
  fetchAllProductsApi,
  createNewProductApi,
  updateProductApi,
  deleteProductApi,
} from "../../api/productsApi";

interface ProductsState {
  products: Product[];
  productResponse: {};
  loading: boolean;
  error: string;
}

const initialState: ProductsState = {
  products: [],
  productResponse: {},
  loading: false,
  error: "",
};

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    return await fetchAllProductsApi();
  }
);

export const createNewProduct = createAsyncThunk(
  "products/create",
  async (product: NewProduct) => {
    const response = await createNewProductApi(product);
    return response;
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async (product: UpdatedProduct) => {
    return await updateProductApi(product);
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: number) => {
    return await deleteProductApi(id);
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
    setProductResponse: (state, action: PayloadAction<Product>) => {
      state.productResponse = action.payload;
    },
  },
  extraReducers: (build) => {
    build
      .addMatcher(
        isAnyOf(
          fetchAllProducts.pending,
          createNewProduct.pending,
          deleteProduct.pending,
          updateProduct.pending
        ),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(isFulfilled(fetchAllProducts), (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addMatcher(
        isFulfilled(createNewProduct),
        (state, action: PayloadAction<Product>) => {
          state.loading = false;
          state.products.push(action.payload);
        }
      )
      .addMatcher(
        isAnyOf(
          fetchAllProducts.rejected,
          createNewProduct.rejected,
          deleteProduct.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.error =
            action.error.message ?? "Failed to perform the operation";
        }
      )
      .addMatcher(isRejectedWithValue(deleteProduct), (state, action) => {
        state.loading = false;
      })
      .addMatcher(isFulfilled(deleteProduct), (state, action) => {
        if (action.payload.result) {
          state.products = state.products.filter(
            (item) => item.id !== action.payload.id
          );
        } else {
          state.error = "Failed to delete the product";
        }
        state.loading = false;
      })
      .addMatcher(isRejectedWithValue(updateProduct), (state, action) => {
        state.loading = false;
      })
      .addMatcher(isFulfilled(updateProduct), (state, action) => {
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
export const {
  cleanUpProductReducer,
  filterProductsByPrice,
  setProductResponse,
} = productsSlice.actions;
export default productsReducer;
