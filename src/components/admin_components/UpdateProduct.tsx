import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";

import useAppDispatch from "../../hooks/useAppDispatch";
import { updateProduct } from "../../redux/reducers/productsReducer";

const UpdateProduct = () => {
  const dispatch = useAppDispatch();
  const [updateById, setUpdateById] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        id: updateById,
        data: {
          title,
          description,
          price,
          images,
        },
      })
    );
    console.log("updateProductById", updateById);
  };

  return (
    <div>
      <h2>UpdateProduct</h2>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label id="updateById">
              Give the ID of the product you want to update:
              <input
                onChange={(e) => setUpdateById(Number(e.target.value))}
                name="updateById"
                value={updateById}
              />
            </label>
          </div>
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
            <button type="submit">Update product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
