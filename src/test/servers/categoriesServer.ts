import { rest } from "msw";
import { setupServer } from "msw/node";
import { category1, category2, category3 } from "../data/categories";

import { Category } from "../../types/Category";

const categoriesServer = setupServer(
  rest.get("https://api.escuelajs.co/api/v1/categories", (req, res, ctx) => {
    return res(ctx.json([category1, category2, category3]));
  })
);

export default categoriesServer;
