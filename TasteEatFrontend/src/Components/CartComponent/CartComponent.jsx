import React, { useState } from "react";
import "./CartComponent.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const CartComponent = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="cartComponent">
      <img 
        src="/Images/Starter2.png" 
        alt="Starter Dish" 
      />
      <div>
        <h2>Name</h2>
        <p>description bbbbbb kbkbkbkb bbbb </p>
        <DeleteOutlineOutlinedIcon 
          className="deleteIcon" 
          onClick={() => {}} 
        />
      </div>
      <div className="quantity">
        <button onClick={handleDecrease}>-</button>
        <input 
          type="number" 
          value={quantity} 
          readOnly 
        />
        <button onClick={handleIncrease}>+</button>
      </div>
      <div className="price">${(4.99 * quantity).toFixed(2)}</div>
    </div>
  );
};

export default CartComponent;