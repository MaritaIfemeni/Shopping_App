import { rest } from "msw";
import { setupServer } from "msw/node";
import { product1, product2, product3, product4 } from "../data/products";

import { Product } from "../../types/Product";
import categories from "../data/categories";
import { NewProduct } from "../../types/NewProduct";

const productServer = setupServer(
  

  rest.get("https://api.escuelajs.co/api/v1/products", (req, res, ctx) => {
    return res(ctx.json([product1, product2, product3, product4]));
  }),

  rest.post(
    "https://api.escuelajs.co/api/v1/products/",
    async (req, res, ctx) => {
      const newProduct = (await req.json()) as NewProduct;
      const category = categories.find((c) => c.id === newProduct.categoryId);
      const error: string[] = [];
      let product: Product | null = null;
      if (!(newProduct.price > 0)) {
        error.push("Price can't be below 0.");
      }
      if (!Array.isArray(newProduct.images)) {
        error.push("Images must be an array.");
      } else if (newProduct.images.length < 1) {
        error.push("Images must have at least one element.");
      } else if (newProduct.images.some((item) => typeof item !== "string")) {
        error.push("Images must be string elements.");
      }
      if (!category) {
        error.push("Invalid category.");
      } else {
        product = {
          title: newProduct.title,
          price: newProduct.price,
          category: category,
          description: newProduct.description,
          images: newProduct.images,
          id: 1,
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
      return res(ctx.status(201), ctx.json(product));
    }
  ),
  rest.delete(
    "https://api.escuelajs.co/api/v1/products/:id",
    async (req, res, ctx) => {
      const { id } = req.params;
      let products: Product[] = [product1, product2, product3, product4];
      const product = products.find((p) => p.id === Number(id));
      if (!product) {
        return res(
          ctx.status(404),
          ctx.json({
            statusCode: 404,
            message: "Product not found",
            error: "Not Found",
          })
        );
      }
      products = products.filter((p) => p.id !== Number(id));
      return res(ctx.status(200), ctx.json({ result: true, id: id }));
    }
  )
);


export default productServer;
