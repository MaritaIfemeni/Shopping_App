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
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(createNewProduct({ title, description, price, categoryId, images }));
      setSuccessMessage("Product created successfully");
      setErrorMessage("");
      setTitle("");
      setDescription("");
      setPrice(0);
      setCategoryId(0);
      setImages([]);
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage("Failed to create product");
    }
  };

  return (
    <div className="add-new-product">
      <h2>Create New Product</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="form-container">
        <form onSubmit={(e) => handleSubmit(e)}>
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
            <label htmlFor="categoryId">Category ID:</label>
            <input
              type="number"
              id="categoryId"
              name="categoryId"
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
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
          <div className="form-group">
            <button type="submit">Create New Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewProduct;
