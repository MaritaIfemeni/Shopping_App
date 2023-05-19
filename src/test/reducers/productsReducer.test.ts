import productsReducer, {
  fetchAllProducts,
  createNewProduct,
  cleanUpProductReducer,
} from "../../redux/reducers/productsReducer";
import store from "../shared/store";
import productServer from "../servers/productServer";
import { invalidProduct, newProduct } from "../data/products";
import { NewProduct } from "../../types/NewProduct";

beforeEach(() => {
  store.dispatch(cleanUpProductReducer());
});

beforeAll(() => {
  productServer.listen();
});

afterAll(() => {
  productServer.close();
});

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
  test("Check if a new product is created", async () => {
    await store.dispatch(createNewProduct(newProduct));
    expect(store.getState().productsReducer.products.length).toBe(1);
  });
  test("Check if invalid product created", async () => {
    await store.dispatch(createNewProduct(invalidProduct));
    expect(store.getState().productsReducer.products.length).toBe(0);
    expect(store.getState().productsReducer.error).toBe(
      "Failed to create product"
    );
  });
});
