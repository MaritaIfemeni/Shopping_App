import React from "react";
import useAppSelector from "../hooks/useAppSelector";
import { Link, useLocation, Outlet } from "react-router-dom";

import Cart from "./Cart";
import useModal from "../hooks/useModal";

const HomePage = () => {
  const currentUser = useAppSelector((state) => state.usersReducer.currentUser);
  const location = useLocation();
  const isProductsPage = location.pathname.includes("/products");
  const isLoginPage = location.pathname.includes("/login");
  const { toggle, isOpen } = useModal();

  return (
    <div>
      <div>
        <header>
          <nav className="testi">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/login">Log In</Link>
            <button onClick={toggle}>Cart</button>
            <Cart isOpen={isOpen} toggle={toggle}>
              <p>Modal Content</p>
              <button onClick={toggle}>Close Cart</button>
            </Cart>
          </nav>
        </header>
        <main>

     
          {!isProductsPage && !isLoginPage && (
            <div>
              <h1>Welcome to MI E-Shop</h1>
              {currentUser && <p>Logged in as {currentUser.name}</p>}
              <p> This is homepage of MI E-Shop</p>
            </div>
          )}
          <div>
            <Outlet />
          </div>
        </main>
      </div>
      <footer> MI E-Shop Enterprises</footer>
    </div>
  );
};

export default HomePage;
