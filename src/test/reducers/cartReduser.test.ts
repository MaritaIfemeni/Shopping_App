import cartReducer, {
  addCartItem,
  clearCart,
  deleteCartItem,
} from "../../redux/reducers/cartReducer";
import { Product } from "../../types/Product";
import { CartItem } from "../../types/CartItem";
import { CartType } from "../../types/CartType";
import store from "../shared/store";

describe("Testing cartReducer", () => {
  test("Check initialState", () => {
    const state = cartReducer(undefined, { type: "unknown" });
    expect(state).toEqual({
      items: [],
      totalSum: 0,
      totalProducts: 0,
    });
  });
  test("should add new item to the cart", () => {
    store.dispatch(addCartItem({} as Product));
    const state = store.getState().cartReducer as CartType;
    expect(state.items.length).toBe(1);
    expect(state.totalProducts).toBe(1);
  });
});
