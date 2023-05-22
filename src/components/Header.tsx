import React from "react";
import { Link } from "react-router-dom";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import Cart from "../pages/Cart";
import useModal from "../hooks/useModal";
import { logout } from "../redux/reducers/userReducer";

const Header = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.usersReducer.currentUser);
  const { toggle, isOpen } = useModal();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <header>
        <div>{currentUser && <p>Logged in as {currentUser.name}</p>}</div>
        <nav className="testi">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <button onClick={toggle}>Cart</button>
          <Cart isOpen={isOpen} toggle={toggle}></Cart>
          {currentUser ? (
            <>
              {currentUser.isAdmin && (
                <>
                  <Link to="/modifyproducts">Modify Products</Link>
                  <Link to="/userlist">User List</Link>
                </>
              )}
              <button onClick={handleLogout}>Logout</button>

              <Link to="/profile">Profile</Link>
            </>
          ) : (
            <Link to="/login">Log In</Link>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;
