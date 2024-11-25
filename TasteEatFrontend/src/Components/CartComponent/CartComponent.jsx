import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  selectCartItems,
  deleteFromCart,
} from "../../Store/cartStore";
import "./CartComponent.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const CartComponent = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const handleIncrease = (item) => {
    dispatch(increaseQuantity(item.id));
  };

  const handleDecrease = (item) => {
    if (item.quantity == 1) {
      dispatch(deleteFromCart(item.id));
    } else {
      dispatch(decreaseQuantity(item.id));
    }
  };
  const deleteItem = (itemId) => {
    dispatch(deleteFromCart(itemId));
  };
  return (
    <div>
      {cartItems.map((item) => (
        <div key={item.id} className="cartComponent">
          <img src={item.photo} alt={item.name} />
          <div>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <button onClick={() => deleteItem(item.id)}>
              <DeleteOutlineOutlinedIcon className="deleteIcon" />
            </button>
          </div>
          <div className="quantity">
            <button onClick={() => handleIncrease(item)}>+</button>
            <span>{item.quantity}</span>
            <button onClick={() => handleDecrease(item)}>-</button>
          </div>
          <div className="price">
            ${(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartComponent;
