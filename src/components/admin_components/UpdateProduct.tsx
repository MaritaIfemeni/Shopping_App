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
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(
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
      setSuccessMessage("Product updated successfully");
      setErrorMessage("");
      setUpdateById(0);
      setTitle("");
      setDescription("");
      setPrice(0);
      setImages([]);
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage("Failed to update product");
    }
  };

  return (
    <div className="add-new-product">
      <h2>UpdateProduct</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="form-container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group">
            <label htmlFor="updateById">Id of the product:</label>
            <input
              type="number"
              name="updateById"
              value={updateById}
              onChange={(e) => setUpdateById(Number(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="images">Images:</label>
            <input
              type="text"
              id="images"
              name="images"
              value={images.join(",")}
              onChange={(e) => setImages(e.target.value.split(","))}
            />
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
