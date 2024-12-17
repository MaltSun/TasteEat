import React, { useEffect, useState } from "react";
import "./CartComponent.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link, useNavigate } from "react-router-dom";


const CartComponent = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems =
      JSON.parse(sessionStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  const updateSessionStorage = (items) => {
    sessionStorage.setItem("cartItems", JSON.stringify(items));
  };

  const handleIncrease = (itemId) => {
    const updatedItems = cartItems.map((item) =>
      item.id === itemId
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );
    setCartItems(updatedItems);
    updateSessionStorage(updatedItems);
  };

  const handleDecrease = (itemId) => {
    const updatedItems = cartItems
      .map((item) => {
        if (item.id === itemId) {
          const newQuantity = (item.quantity || 1) - 1;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      })
      .filter((item) => item !== null);

    setCartItems(updatedItems);
    updateSessionStorage(updatedItems);
  };

  const deleteItem = (itemId) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);
    updateSessionStorage(updatedItems);
  };

  return (
    <div>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
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
              <button onClick={() => handleDecrease(item.id)}>-</button>
              <span>{item.quantity || 1}</span>{" "}
              <button onClick={() => handleIncrease(item.id)}>+</button>{" "}
            </div>
            <div className="price">
              ${(item.price * (item.quantity || 1)).toFixed(2)}
            </div>
          </div>
        ))
      ) : (
        <div className="emptyCart">
          <img src="./Images/ProfileImage.png" alt="Profile" />
          <h1>Your Cart Is Empty</h1>
          <p>Добавьте что-то из меню для заказа</p>
          <Link className="filleadButton" to={{ pathname: "/menu" }}>
            Go To Menu
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartComponent;
