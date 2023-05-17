import React from "react";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { closeModal } from "../redux/reducers/modalReducer";
import { deleteCartItem, clearCart } from "../redux/reducers/cartReducer";
import { ModalProps } from "../types/ModalProps";
import { CartItem } from "../types/CartItem";

const Cart = (props: ModalProps) => {
  const isOpen = useAppSelector((state) => state.modalReducer.isOpen);
  const items = useAppSelector((state) => state.cartReducer.items);
  const dispatch = useAppDispatch();
  if (!props.isOpen) {
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
              </li>
            ))}
            <button onClick={handleClearCart}>Clear</button>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Cart;
