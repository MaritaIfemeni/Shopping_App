import React, { useState } from "react";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { deleteProduct } from "../redux/reducers/productsReducer";

const DeleteProduct = () => {
  const dispatch = useAppDispatch();
  const [deleteById, setDeleteById] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(deleteProduct(deleteById));
    console.log("deleteProductById", deleteById);
  };



  return (
    <div>
      DeleteProduct
  
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label id="deleteById">
              Give the ID of the product you want to delete:
              <input
                onChange={(e) => setDeleteById(Number(e.target.value))}
                name="deleteById"
                value={deleteById}
              />
            </label>
          </div>
            <button type="submit">Delete Product</button>
        </form>
      </div>
    </div>
  );
};

export default DeleteProduct;
