import React, { useEffect, useState } from "react";
import "./OrderComponent.css";
import { Link, useNavigate } from "react-router-dom";

const OrderComponent = ({ customerId }) => {
  const [orders, setOrders] = useState([]);
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    const PORT = import.meta.env.VITE_PORT;
    const fetchOrderDetails = async () => {
      if (!userId) {
        console.error("User ID not found in sessionStorage");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:${PORT}/api/order/uncompleted/customer/${userId}`
        );
        if (!response.ok) {
          throw new Error("Ошибка при получении заказа");
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrderDetails();
  }, [customerId, userId]); 

  return (
    <div className="orders">
      {orders.length > 0 ? (
        orders.map((order) => (
          <div className="orderBlock" key={order.id}>
            {order.Dishes.map((dish) => (
              <div className="orderCard" key={dish.id}>
                <img src={dish.photo} alt={dish.name} />
                <div>
                  <p>{dish.name}</p>
                  <p>× {dish.OrderDish.quantity}</p>
                </div>
                <h2>${dish.price.toFixed(2)}</h2>
              </div>
            ))}
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

      <hr />
      <div>
        <h2>
          Total Price $
          {orders
            .reduce(
              (total, order) =>
                total +
                order.Dishes.reduce(
                  (orderTotal, dish) =>
                    orderTotal + dish.price * dish.OrderDish.quantity,
                  0
                ),
              0
            )
            .toFixed(2)}
        </h2>
      </div>
    </div>
  );
};

export default OrderComponent;