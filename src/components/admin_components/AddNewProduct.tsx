import React, { useState } from "react";

import useAppDispatch from "../../hooks/useAppDispatch";
import { createNewProduct } from "../../redux/reducers/productsReducer";

const AddNewProduct = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      createNewProduct({ title, description, price, categoryId, images })
    );
  };

  return (
    <div>
      <h2>Create New Product</h2>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label id="title">
              title:
              <input
                onChange={(e) => setTitle(e.target.value)}
                name="title"
                value={title}
              />
            </label>
          </div>
          <div>
            <label id="description">
              description:
              <input
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                value={description}
              />
            </label>
          </div>
          <div>
            <label id="price">
              price:
              <input
                onChange={(e) => setPrice(Number(e.target.value))}
                name="price"
                value={price}
              />
            </label>
          </div>
          <div>
            <label id="categoryId">
              categoryId:
              <input
                onChange={(e) => setCategoryId(Number(e.target.value))}
                name="categoryId"
                value={categoryId}
              />
            </label>
          </div>
          <div>
            <label id="images">
              images:
              <input
                onChange={(e) => setImages(e.target.value.split(","))}
                name="images"
                value={images}
              />
            </label>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewProduct;
