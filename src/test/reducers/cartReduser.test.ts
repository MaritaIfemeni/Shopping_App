import cartReducer, {
  addCartItem,
  clearCart,
  deleteCartItem,
} from "../../redux/reducers/cartReducer";
import { Product } from "../../types/Product";
import { CartItem } from "../../types/CartItem";
import { CartType } from "../../types/CartType";
import store from "../shared/store";

const newProduct: Product = {
  id: 1,
  title: "test",
  description: "test",
  price: 100,
  images: ["test"],
  category: {
    id: 1,
    name: "test",
    image: "test",
  },
};

describe("Testing cartReducer", () => {
  test("Check initialState", () => {
    const state = cartReducer(undefined, { type: "unknown" });
    expect(state).toEqual({
      items: [],
      totalSum: 0,
      totalProducts: 0,
    });
  });
  test("Check if a product is added to cart", async () => {
    await store.dispatch(addCartItem(newProduct));
    expect(store.getState().cartReducer.items.length).toBe(1);
    expect(store.getState().cartReducer.totalSum).toBe(100);
    expect(store.getState().cartReducer.totalProducts).toBe(1);
  });
  test("Check if a product is deleted from cart", async () => {
    await store.dispatch(addCartItem(newProduct));
    const id = store.getState().cartReducer.items[0].cartId;
    await store.dispatch(deleteCartItem(id));
    expect(store.getState().cartReducer.items.length).toBe(0);
    expect(store.getState().cartReducer.totalSum).toBe(0);
    expect(store.getState().cartReducer.totalProducts).toBe(0);
  });
  test("Check if cart is cleared", async () => {
    await store.dispatch(addCartItem(newProduct));
    await store.dispatch(clearCart());
    expect(store.getState().cartReducer.items.length).toBe(0);
    expect(store.getState().cartReducer.totalSum).toBe(0);
    expect(store.getState().cartReducer.totalProducts).toBe(0);
  });
  test("Check if one product is decreased from cart", async () => {
    await store.dispatch(addCartItem(newProduct));
    const id = store.getState().cartReducer.items[0].cartId;
    await store.dispatch(deleteCartItem(id));
    expect(store.getState().cartReducer.items.length).toBe(0);
    expect(store.getState().cartReducer.totalSum).toBe(0);
    expect(store.getState().cartReducer.totalProducts).toBe(0);
  });
});
