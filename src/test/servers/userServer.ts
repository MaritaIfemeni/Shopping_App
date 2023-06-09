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
    const newUser = (await req.json()) as User;
    const error: string[] = [];
    if (error.length > 0) {
      return res(
        ctx.status(500),
        ctx.json({
          statusCode: 500,
          message: error,
          error: "Bad Request",
        })
      );
    }
    return res(ctx.status(201), ctx.json(newUser));
  }),
  rest.get(
    "https://api.escuelajs.co/api/v1/auth/login",
    async (req, res, ctx) => {
      const { email, password } = req.body as User;
      const error: string[] = [];
      if (error.length > 0) {
        return res(
          ctx.status(500),
          ctx.json({
            statusCode: 500,
            message: error,
            error: "Bad Request",
          })
        );
      }
      return res(ctx.status(201), ctx.json({}));
    }
  )
);

export default userServer;
