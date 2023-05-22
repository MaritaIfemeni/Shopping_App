import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import useDebounce from "../hooks/useDebounce";
import getFilteredList from "../hooks/getFilteredList";
import {
  fetchAllProducts,
  filterProductsByPrice,
} from "../redux/reducers/productsReducer";
import { Product } from "../types/Product";
import { addCartItem } from "../redux/reducers/cartReducer";

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.productsReducer.products);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<number>(0);
  const debouncedSearch = useDebounce<string>(search, 500);
  const filterProducts = getFilteredList(products, debouncedSearch);
  const [page, setPage] = useState(1);
  const limit = 5;
  const filteredProducts = products.slice((page - 1) * limit, page * limit);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleAddToCart = (product: Product) => {
    dispatch(addCartItem(product));
  };
  useEffect(() => {
    setPage(1);
  }, [products]);
  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleFilterByPrice = () => {
    dispatch(filterProductsByPrice(sort));
  };

  return (
    <div>
      This is ProductsPage
      <div>
        <input
          type="text"
          name="search"
          value={search}
          placeholder="Search"
          onChange={onSearchChange}
        />
        {search !== "" && filterProducts.length > 0 && (
          <ul>
            {filterProducts.map((product) => (
              <li key={product.id}>{product.title}</li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <select value={sort} onChange={(e) => setSort(Number(e.target.value))}>
          <option value={0}>Low to High</option>
          <option value={1}>High to Low</option>
        </select>
        <button onClick={handleFilterByPrice}>Sort by Price</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Product Description</th>
            <th>Product Image</th>
            <th>More details</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>
                {product.images.length > 0 && (
                  <img src={product.images[0]} alt="Product" />
                )}
              </td>
              <td>
                <Link to={`/product/${product.id}`}>
                  <button>details</button>
                </Link>
              </td>
              <td>
                <button onClick={() => handleAddToCart(product)}>
                  Add to cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handlePrevPage} disabled={page === 1}>
        Prev
      </button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
};

export default ProductsPage;
