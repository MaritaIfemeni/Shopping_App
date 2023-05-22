import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./reducers/productsReducer";
import modalReducer from "./reducers/modalReducer";
import cartReducer from "./reducers/cartReducer";
import usersReducer from "./reducers/userReducer";
import { saveCartStateToLocalStorage, loadCartStateFromLocalStorage } from "../utils/localStorageUtils";

const persistedCartState = loadCartStateFromLocalStorage();

const store = configureStore({
  reducer: {
    productsReducer,
    modalReducer,
    cartReducer,
    usersReducer,
  },
  preloadedState: {
    cartReducer: persistedCartState, // Set the preloaded state for the cartReducer
  },
});

store.subscribe(() => {
  const { cartReducer } = store.getState();
  saveCartStateToLocalStorage(cartReducer);
});

export type GlobalState = ReturnType<typeof store.getState>; //typeskript shortcut to get the type of the global state
export type AppDispatch = typeof store.dispatch;
export default store;
