import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Container,
  InputBase,
  Select,
  MenuItem,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  List,
  ListItem,
  IconButton,
  Typography,
  TextField,
  Autocomplete,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";

import useDebounce from "../hooks/useDebounce";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import getFilteredList from "../hooks/getFilteredList";
import {
  fetchAllProducts,
  filterProductsByPrice,
} from "../redux/reducers/productsReducer";
import {
  fetchCategories,
  selectCategory,
  setCategories,
} from "../redux/reducers/categoryReducer";
import { Product } from "../types/Product";
import { addCartItem } from "../redux/reducers/cartReducer";
import { Category } from "../types/Category";

const SearchInput = styled(InputBase)(({ theme }) => ({
  width: "60%",
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(2, 0),
  height: "2.5em",
}));

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.productsReducer.products);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<number>(0);
  const debouncedSearch = useDebounce<string>(search, 500);
  const filterProducts = getFilteredList(products, debouncedSearch);
  const [page, setPage] = useState(1);
  const limit = 5;
  const filteredProducts = useAppSelector((state) => {
    if (state.categoriesReducer.selectedCategory === null) {
      return products.slice((page - 1) * limit, page * limit);
    } else {
      const categoryId = state.categoriesReducer.selectedCategory.id;
      return products.filter((product) => product.category.id === categoryId);
    }
  });
  const [category, setCategory] = useState<Category | null>(null);
  const { categories, selectedCategory } = useAppSelector(
    (state) => state.categoriesReducer
  );

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  useEffect(() => {
    setPage(1);
  }, [products]);
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleAddToCart = (product: Product) => {
    dispatch(addCartItem(product));
  };
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
  const handleCategoryChange = (categoryId: number) => {
    dispatch(selectCategory(categoryId));
  };

  return (
    <Container>
      <Typography variant="h4" color="primary" sx={{ margin: "0.5em 0" }}>
        Here you can start browsing the products!
      </Typography>
      <SearchInput
        type="text"
        value={search}
        placeholder="Search"
        onChange={onSearchChange}
        startAdornment={
          <IconButton edge="start" disabled>
            <SearchIcon />
          </IconButton>
        }
      />
      {search !== "" && filterProducts.length > 0 && (
        <List sx={{ backgroundColor: "#f5f5f5", padding: "1em" }}>
          {filterProducts.map((product) => (
            <ListItem key={product.id}>
              <Link to={`/product/${product.id}`}> {product.title}</Link>
            </ListItem>
          ))}
        </List>
      )}
      <Typography variant="h5" sx={{ margin: "0 0 1em 1em" }}>
        <Select
          value={selectedCategory ? selectedCategory.id : 0}
          onChange={(e) => handleCategoryChange(Number(e.target.value))}
          sx={{ minWidth: "15%", height: "2.5em", marginRight: "1em" }}
        >
          <MenuItem value={0}>All Categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={sort}
          onChange={(e) => setSort(Number(e.target.value))}
          sx={{ minWidth: "15%", height: "2.5em" }}
        >
          <MenuItem value={0}>Low to High</MenuItem>
          <MenuItem value={1}>High to Low</MenuItem>
        </Select>
        <Button
          variant="contained"
          onClick={handleFilterByPrice}
          sx={{ marginLeft: "1em" }}
        >
          <SortIcon sx={{ marginRight: "0.5em" }} /> Sort by Price
        </Button>
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Product Price</TableCell>
              <TableCell>Product Description</TableCell>
              <TableCell>Product Image</TableCell>
              <TableCell>More details</TableCell>
              <TableCell>Add to cart</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.price} £</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  {product.images.length > 0 && (
                    <img src={product.images[0]} alt="Product" />
                  )}
                </TableCell>
                <TableCell>
                  <Link to={`/product/${product.id}`}>
                    <Button variant="outlined">Details</Button>
                  </Link>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to cart
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={handlePrevPage} disabled={page === 1}>
        Prev
      </Button>
      <Button onClick={handleNextPage}>Next</Button>
    </Container>
  );
};

export default ProductsPage;
