import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import { Product } from "../types/Product";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { addCartItem } from "../redux/reducers/cartReducer";

const SingleProductPage = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state) => state.productsReducer
  );
  const { id } = useParams();
  const selectedProduct =
    products && products.find((product: Product) => product.id === Number(id));
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(
    selectedProduct
  );
  useEffect(() => {
    if (selectedProduct) {
      setCurrentProduct(selectedProduct);
      localStorage.setItem("currentProduct", JSON.stringify(selectedProduct));
    }
  }, []);
  useEffect(() => {
    setCurrentProduct(
      JSON.parse(localStorage.getItem("currentProduct") || "{}")
    );
  }, []);
  const handleAddToCart = (product: Product | undefined) => {
    if (product) {
      dispatch(addCartItem(product));
    }
  };

  return (
    <div>
      This is SingeleProductPage
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
            <td>{currentProduct?.title}</td>
            <td>{currentProduct?.price}</td>
            <td>{currentProduct?.description}</td>
            <button onClick={() => handleAddToCart(currentProduct)}>
              Add to cart
            </button>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SingleProductPage;
