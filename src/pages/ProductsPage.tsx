import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import {
  fetchAllProducts,
  setCurrentPage,
} from "../redux/reducers/productsReducer";
import { Product } from "../types/Product";

const getFilteredList = (products: Product[], search: string) => {
  return products.filter((product) =>
    product.title.toLowerCase().includes(search.toLocaleLowerCase())
  );
};

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.productsReducer.products);
  const currentPage = useAppSelector(
    (state) => state.productsReducer.currentPage
  );
  const [search, setSearch] = useState<string>("");
  const filterProducts = getFilteredList(products, search);
  useEffect(() => {
    dispatch(fetchAllProducts(currentPage));
  }, []);
  const onSerachChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleNextPage = () => {
    dispatch(fetchAllProducts(currentPage + 1));
    dispatch(setCurrentPage(currentPage + 1));
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(fetchAllProducts(currentPage - 1));
      dispatch(setCurrentPage(currentPage - 1));
    }
    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // TODO: create debounse for search, store it inte custom hooks!
      setSearch(e.target.value);
    };
  };

  return (
    <div>
      ProdyctPage
      <div>
        <input
          type="text"
          name="search"
          value={search}
          placeholder="Search"
          onChange={onSerachChange}
        />
      </div>
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
          {filterProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>
                <Link to={`/product/${product.id}`}>
                  <button>details</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handlePrevPage}>Prev</button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
};

export default ProductsPage;
