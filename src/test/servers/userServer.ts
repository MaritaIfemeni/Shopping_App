import { rest } from "msw";
import { setupServer } from "msw/node";
import { user1, user2, user3, user4 } from "../data/users";
import { NewUser } from "../../types/NewUser";
import { User } from "../../types/User";

const userServer = setupServer(
  rest.get("https://api.escuelajs.co/api/v1/users", (req, res, ctx) => {
    return res(ctx.json([user1, user2, user3, user4]));
  }),
  rest.post("https://api.escuelajs.co/api/v1/users/", async (req, res, ctx) => {
    const newUser = (await req.json()) as NewUser;
    const error: string[] = [];
    let user: NewUser | null = null;
    if (newUser.name) {
      error.push("Name is required.");
    }
    if (!newUser.email) {
      error.push("Email is required.");
    }
    if (newUser.password.length > 3) {
      error.push("Password must be at least 4 characters long.");
    }
    if (newUser.avatar) {
        error.push("Avatar is required.");
    }
     else {
      user = {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        avatar: newUser.avatar,
      };
    }
    if (error.length > 0) {
      return res(
        ctx.status(400),
        ctx.json({
          statusCode: 400,
          message: error,
          error: "Bad Request",
        })
      );
    }
    return res(ctx.status(201), ctx.json(user));
  })
);

export default userServer;