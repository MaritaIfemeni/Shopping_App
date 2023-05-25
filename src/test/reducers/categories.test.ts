import categoriesReducer, {
  fetchCategories,
  setCategories,
  selectCategory,
  cleanUpCategoriesReducer,
} from "../../redux/reducers/categoryReducer";
import store from "../shared/store";
import categoriesServer from "../servers/categoriesServer";

beforeEach(() => {
  store.dispatch(cleanUpCategoriesReducer());
});

beforeAll(() => {
  categoriesServer.listen();
});

afterAll(() => {
  categoriesServer.close();
});

describe("Testing categoriesReducer", () => {
  test("Check initialState", () => {
    const state = categoriesReducer(undefined, { type: "unknown" });
    expect(state).toEqual({
      categories: [],
      selectedCategory: null,
    });
  });
  test("Check if fetching all categories works", async () => {
    await store.dispatch(fetchCategories());
    expect(store.getState().categoriesReducer.categories.length).toBe(3);
    expect(store.getState().categoriesReducer.selectedCategory).toBe(null);
  });
  test("Check if a category is selected", async () => {
    await store.dispatch(fetchCategories());
    const id = store.getState().categoriesReducer.categories[0].id;
    await store.dispatch(selectCategory(id));
    expect(store.getState().categoriesReducer.selectedCategory).not.toBe(null);
  });
});
