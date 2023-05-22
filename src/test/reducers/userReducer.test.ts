import usersReducer, {
  cleanUpUserReducer,
  createNewUser,
  fetchAllUsers,
} from "../../redux/reducers/userReducer";
import { User } from "../../types/User";
import { newUser, user1, user2, user3, user4 } from "../data/users";
import userServer from "../servers/userServer";
import store from "../shared/store";

beforeEach(() => {
  store.dispatch(cleanUpUserReducer());
});

beforeAll(() => {
  userServer.listen();
});

afterAll(() => {
  userServer.close();
});

describe("Testin userReducer", () => {
  test("Should return the initial state", () => {
    expect(usersReducer(undefined, { type: "" })).toEqual({
      users: [],
      loading: false,
      error: "",
    });
  });
  test("Should return the state with the users", async () => {
    await store.dispatch(fetchAllUsers());
    expect(store.getState().usersReducer.users).toEqual([
      user1,
      user2,
      user3,
      user4,
    ]);
    expect(store.getState().usersReducer.loading).toBeFalsy();
    expect(store.getState().usersReducer.error).toBe("");
  });
  test("Check if a new user is created", async () => {
    await store.dispatch(createNewUser(newUser));
    expect(store.getState().usersReducer.users.length).toBe(1);
  });
});
