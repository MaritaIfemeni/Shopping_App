import React from "react";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { closeModal } from "../redux/reducers/modalReducer";
import { addMoreOneItem, decreaseOneItem, deleteCartItem, clearCart } from "../redux/reducers/cartReducer";
import { ModalProps } from "../types/ModalProps";
import { CartItem } from "../types/CartItem";
import { CartType } from "../types/CartType";

const Cart = (props: ModalProps) => {
  const {isOpen} = props;
  const {items, totalSum, totalProducts} : CartType = useAppSelector((state) => state.cartReducer);
  const dispatch = useAppDispatch();
  if (!isOpen) {
    return null;
  }
  const handleCloseModal = () => {
    dispatch(closeModal());
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const handleDeleteCartItem = (cartId: string) => {
    dispatch(deleteCartItem(cartId));
  };
  const handleAddMoreOneItem = (cartId: string) => {
    dispatch(addMoreOneItem(cartId));
  };
  const handleDecreaseOneItem = (cartId: string) => {
    dispatch(decreaseOneItem(cartId));
  };


  return (
    <div className="modal-overlay">
      <div className="modal-box">
        {props.children}
        {items.length === 0 ? (
          <p>Your shopping cart is empty.</p>
        ) : (
          <ul>
            {items.map((item: CartItem) => (
              <li key={item.cartId}>
                <p>Product: {item.title}</p>
                <p>Price: {item.price}</p>
                <button onClick={() => handleDeleteCartItem(item.cartId)}>
                  Delete
                </button>
                <button onClick={() => handleAddMoreOneItem(item.cartId)}>
                  Add more
                </button>
                <button onClick={() => handleDecreaseOneItem(item.cartId)}>
                  Decrease
                </button>
                <p>Quantity: {item.total}</p>
              </li>
            ))}
            <p>Total Products in Cart: {totalProducts} </p>
            <p>Total Sum of Cart products: {totalSum} </p>
            <button onClick={handleClearCart}>Clear</button>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Cart;
