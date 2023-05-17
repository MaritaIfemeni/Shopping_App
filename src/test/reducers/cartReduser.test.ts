import cartReducer, { addItem } from "../../redux/reducers/cartReducer";
import { Product } from "../../types/Product";

describe("Testing cSartReducer", () => {
  test("Check initialState", () => {
    const state = cartReducer(undefined, { type: "unknown" });
    expect(state).toEqual({
      items: [],
    });
  });
  test("Should add new item", () => {
    const item: Product = {
      id: 1,
      title: "Test",
      description: "Test",
      price: 100,
      category: {
        id: 1,
        name: "Test",
        image: "Test",
      },
      images: ["Test"],
    };
    const state = cartReducer(undefined, addItem(item));
    expect(state).toEqual({
      items: [item],
    });
  });
});
