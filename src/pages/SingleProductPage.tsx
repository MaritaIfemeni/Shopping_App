import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

import { Product } from "../types/Product";

const SingleProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>();
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [id]);
  if (!product) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      SingeleProductPage
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Product Description</th>
            <th>Product Image</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{product.title}</td>
            <td>{product.price}</td>
            <td>{product.description}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SingleProductPage;
