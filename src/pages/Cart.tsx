import React, { ReactNode } from "react";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { closeModal } from "../redux/reducers/modalReducer";
import { removeItem, clearCart } from "../redux/reducers/cartReducer";
import { Product } from "../types/Product";

interface ModalProps {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

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

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        {props.children}
        {items.length === 0 ? (
          <p>Your shopping cart is empty.</p>
        ) : (
          <ul>
            {items.map((item: Product) => (
              <li key={item.id}>
                <span>{item.title}</span>
                <span>{item.price}</span>
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
