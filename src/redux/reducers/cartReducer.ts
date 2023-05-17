import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { Product } from "../../types/Product";
import { CartItem } from "../../types/CartItem";
import { CartType } from "../../types/CartType";

const initialState: CartType = {
  items: [],
  totalSum: 0,
  totalProducts: 0,
};

const cartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<Product>) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.total += 1;
        existingItem.sum = existingItem.total * existingItem.price;
      } else {
        const cartItem: CartItem = {
          ...newItem,
          total: 1,
          sum: newItem.price,
          cartId: uuidv4(),
        };
        state.items.push(cartItem);
      }
      state.totalProducts += 1;
      state.totalSum += newItem.price;
    },
    deleteCartItem: (state, action: PayloadAction<string>) => {
      const cartId = action.payload;
      const existingItem = state.items.find((item) => item.cartId === cartId);
      if (existingItem) {
        state.totalProducts -= existingItem.total;
        state.totalSum -= existingItem.sum;
        state.items = state.items.filter((item) => item.cartId !== cartId);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addCartItem, deleteCartItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
