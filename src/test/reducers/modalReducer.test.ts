import modalReducer, {
    openModal,
    closeModal,
  } from "../../redux/reducers/modalReducer";
  import store from "../shared/store";
  
  describe("Testing modalReducer", () => {
    test("Check initialState", () => {
      const state = modalReducer(undefined, { type: "unknown" });
      expect(state).toEqual({
        isOpen: false,
      });
    });
    test("Should open modal", () => {
      store.dispatch(openModal());
      expect(store.getState().modalReducer.isOpen).toBeTruthy();
    });
    test("Should close modal", () => {
      store.dispatch(closeModal());
      expect(store.getState().modalReducer.isOpen).toBeFalsy();
    });
  });
  