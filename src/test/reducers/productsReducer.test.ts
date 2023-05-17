import productsReducer, {
  fetchAllProducts,
  setCurrentPage,
} from "../../redux/reducers/productsReducer";
import store from "../shared/store";

describe("Testing productsReduser", () => {
  test("Check initialState", () => {
    const state = productsReducer(undefined, { type: "unknown" });
    expect(state).toEqual({
      products: [],
      currentPage: 1,
      loading: false,
      error: "",
    });
  });
  test("Shuold set current page", () => {
    store.dispatch(setCurrentPage(2));
    expect(store.getState().productsReducer.currentPage).toBe(2);
  });
  test("Check if fetching all products works", async () => {
    await store.dispatch(fetchAllProducts(1));
    expect(store.getState().productsReducer.products.length).toBe(10);
    expect(store.getState().productsReducer.loading).toBeFalsy();
    expect(store.getState().productsReducer.error).toBeFalsy();
  });
});
