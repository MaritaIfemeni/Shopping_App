import { Product } from "../../types/Product";
import { category1, category2, category3 } from "./categories";
import { NewProduct } from "../../types/NewProduct";

const product1: Product = {
    id: 1,
    title: "TestServer product 1",
    price: 100,
    description: "product 1",
    images: [],
    category: category1
}

const product2: Product = {
    id: 2,
    title: "TestServer product 2",
    price: 300,
    description: "product 2",
    images: [],
    category: category2
}

const product3: Product = {
    id: 3,
    title: "TestServer product 3",
    price: 200,
    description: "product 3",
    images: [],
    category: category3
}

const product4: Product = {
    id: 4,
    title: "TestServer product 4",
    price: 50,
    description: "product 4",
    images: [],
    category: category1
}

const newProduct: NewProduct = {
    title: "New TestServer product",
    price: 500,
    description: "new product",
    images: [""],
    categoryId: 3
}

const invalidProduct: NewProduct = {
    title: "NotValid TestServer product",
    price: 0,
    description: "new product",
    images: [],
    categoryId: 5
}

export { product1, product2, product3, product4, newProduct, invalidProduct }