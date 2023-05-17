import productsReducer, {
  fetchAllProducts,
} from "../../redux/reducers/productsReducer";
import store from "../shared/store";

describe("Testing productsReduser", () => {
  test("Check initialState", () => {
    const state = productsReducer(undefined, { type: "unknown" });
    expect(state).toEqual({
      products: [],
      loading: false,
      error: "",
    });
  });
  test("Check if fetching all products works", async () => {
    await store.dispatch(fetchAllProducts());
    expect(store.getState().productsReducer.loading).toBeFalsy();
    expect(store.getState().productsReducer.error).toBeFalsy();
  });
});
