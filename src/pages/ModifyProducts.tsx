import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { createNewProduct } from "../redux/reducers/productsReducer";
import { NewProduct } from "../types/NewProduct";
import newProductSchema, { NewProductFormData } from "../validation/newProductSchema";

const ModifyProducts = () => {
  //const { register, handleSubmit } = useForm<NewProduct>();
  const dispatch = useAppDispatch();
  //const products = useAppSelector((state) => state.productsReducer.products);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<NewProductFormData>({
    resolver: yupResolver(newProductSchema),
  });

  const onSubmit = (data: NewProductFormData) => {
    const product: NewProduct = {
      ...data,
      images: data.images ? (data.images as string[]) : [], // Ensure images is an array or default to an empty array
    };

    dispatch(createNewProduct(product));
    console.log(data);
    console.log(
      typeof data.images,
      typeof data.categoryId,
      typeof data.price,
      typeof data.title,
      typeof data.description
    );
  };

  return (
    <div>
      <h3>Add Products</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">Product Name</label>
          <input {...register("title")} type="text" title="title" id="title" />
        </div>
        <p>{errors.title?.message}</p>
        <div>
          <label htmlFor="price">Price</label>
          <input
            {...register("price")}
            type="number"
            title="price"
            id="price"
          />
          <p>{errors.price?.message}</p>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            {...register("description")}
            type="text"
            title="description"
            id="description"
          />
          <p>{errors.description?.message}</p>
        </div>
        <div>
          <label htmlFor="images">Images</label>
          <input
            {...register("images")}
            type="text"
            id="images"
            name="images"
          />
          <p>{errors.images?.message}</p>
        </div>
        <div>
          <label htmlFor="categoryId">Category</label>
          <input
            {...register("categoryId")}
            type="text"
            title="categoryId"
            id="categoryId"
          />
        </div>
        <p>{errors.categoryId?.message}</p>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ModifyProducts;
