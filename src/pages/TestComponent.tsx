import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import useAppDispatch from "../hooks/useAppDispatch";
import { createNewProduct } from "../redux/reducers/productsReducer";
import { NewProduct } from "../types/NewProduct";

const TestComponent = () => {
  const dispatch = useAppDispatch();
  const { handleSubmit, register } = useForm<NewProduct>();

  const onSubmit: SubmitHandler<NewProduct> = (data) => {
    const formattedData: NewProduct = {
        title: data.title,
        description: data.description,
        price: data.price,
        categoryId: data.categoryId,
        images: ["images"]
    };
    dispatch(createNewProduct(formattedData));
    console.log(formattedData);
    console.log(data.images);
    console.log(typeof data.images);
    };

  return (
    <div>
    <h2>Create New Product</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <TextField
          {...register("title")}
          label="Title"
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          {...register("description")}
          label="Description"
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          {...register("price")}
          type="number"
          label="Price"
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          {...register("categoryId")}
          type="number"
          label="Category ID"
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          {...register("images")}
          label="Images"

          variant="outlined"
          helperText="Separate image URLs by comma"
        />
      </div>
      <div>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </form>
  </div>
);
};

export default TestComponent;
