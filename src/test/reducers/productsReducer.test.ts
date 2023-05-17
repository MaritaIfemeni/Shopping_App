import productsReducer from "../../redux/reducers/productsReducer";

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
});
