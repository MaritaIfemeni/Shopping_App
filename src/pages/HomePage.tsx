import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";

const HomePage = () => {
  const location = useLocation();
  const isProductsPage = location.pathname.includes("/products");
  const isLoginPage = location.pathname.includes("/login");

  return (
    <div>
      <div>
      <header>
        <nav className="testi">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/login">Log In</Link>
        </nav>
      </header>
      <main>
 {!isProductsPage && !isLoginPage && (
          <div>
            <h1>Welcome to MI E-Shop</h1>
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
