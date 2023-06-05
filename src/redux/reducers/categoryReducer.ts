import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchCategoriesApi } from "../../api/categoriesApi";
import { Category } from "../../types/Category";

interface CategoryState {
  categories: Category[];
  selectedCategory: Category | null;
}

const initialState: CategoryState = {
  categories: [],
  selectedCategory: null,
};

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    return await fetchCategoriesApi();
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    cleanUpCategoriesReducer: (state) => {
      return initialState;
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    selectCategory: (state, action: PayloadAction<number>) => {
      state.selectedCategory =
        state.categories.find((category) => category.id === action.payload) ||
        null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

const categoriesReducer = categorySlice.reducer;
export const { setCategories, selectCategory, cleanUpCategoriesReducer } =
  categorySlice.actions;

export default categoriesReducer;
