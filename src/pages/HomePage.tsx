import React from "react";


import useAppSelector from "../hooks/useAppSelector";

const HomePage = () => {
  const currentUser = useAppSelector((state) => state.usersReducer.currentUser);

  return (
    <div>
      <div>
        <h1>Welcome to MI E-Shop</h1>
        {currentUser && <p>Logged in as {currentUser.name}</p>}
        <p> This is homepage of MI E-Shop</p>
      </div>
    </div>
  );
};

export default HomePage;
