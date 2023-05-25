import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./reducers/productsReducer";
import modalReducer from "./reducers/modalReducer";
import cartReducer from "./reducers/cartReducer";
import usersReducer from "./reducers/userReducer";
import categoriesReducer from "./reducers/categoryReducer"; 
import {
  saveCartStateToLocalStorage,
  loadCartStateFromLocalStorage,
} from "../utils/localStorageUtils";

const persistedCartState = loadCartStateFromLocalStorage();

const store = configureStore({
  reducer: {
    productsReducer,
    modalReducer,
    cartReducer,
    usersReducer,
    categoriesReducer,
  },
  preloadedState: {
    cartReducer: persistedCartState,
  },
});

store.subscribe(() => {
  const { cartReducer } = store.getState();
  saveCartStateToLocalStorage(cartReducer);
});

export type GlobalState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;
export default store;
