import React, { useEffect, useState } from "react";
import "./OrderComponent.css";

const OrderComponent = ({ customerId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/order/uncompleted/customer/3`
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
  }, [customerId]);

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
        <p>Нет завершенных заказов.</p>
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
