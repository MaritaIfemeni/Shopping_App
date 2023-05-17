import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "../../redux/reducers/productsReducer";
import modalReducer from "../../redux/reducers/modalReducer";
import cartReducer from "../../redux/reducers/cartReducer";

const store = configureStore({
  reducer: {
    productsReducer,
    modalReducer,
    cartReducer,
  },
});

export type GlobalState = ReturnType<typeof store.getState>; //typescript shortcut to get the type of the global state
export type AppDispatch = typeof store.dispatch;
export default store;
