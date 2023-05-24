import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { c } from 'msw/lib/glossary-de6278a9';

interface Category {
  id: number;
  name: string;
  image: string;
}

interface CategoryState {
  categories: Category[];
  selectedCategory: Category | null;
}

const initialState: CategoryState = {
  categories: [],
  selectedCategory: null,
};

export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async () => {
    try {
      const response = await axios.get<Category[]>(
        'https://api.escuelajs.co/api/v1/categories'
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
        state.categories = action.payload;
      },
      selectCategory: (state, action: PayloadAction<number>) => {
        state.selectedCategory = state.categories.find(
          (category) => category.id === action.payload
        ) || null;
      },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

const categoriesReducer = categorySlice.reducer;
export const { setCategories, selectCategory } = categorySlice.actions;

export default categoriesReducer;
