import React, { useState } from "react";
import DeleteProduct from "../components/DeleteProduct";
import UpdateProduct from "../components/UpdateProduct";
import AddNewProduct from "../components/AddNewProduct";

const ModifyProducts = () => {
  return (
    <div>
      <DeleteProduct />
      <UpdateProduct />
      <AddNewProduct />
    </div>
  );
};

export default ModifyProducts;
