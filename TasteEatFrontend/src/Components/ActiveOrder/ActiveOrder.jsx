import React, { useState, useEffect } from "react";
import YandexMap from "../../Components/YandexMap/YandexMap";
import "./ActiveOrder.css";

const ActiveOrder = ({ orders: initialOrders, onOrderComplete }) => {
  const [orders, setOrders] = useState(initialOrders || []);
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    setOrders(initialOrders || []);
  }, [initialOrders]);

  const deleteOrder = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/order/delete/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Ошибка при отмене заказа");
      }

      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );

      if (orders.length === 1) {
        onOrderComplete(); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  const completeOrder = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/order/complete/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Ошибка при изменении статуса заказа");
      }
      const updatedOrder = await response.json();
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== updatedOrder.id) 
      );

      if (orders.length === 1) {
        onOrderComplete(); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="activeOrder">
      {orders.length > 0 ? (
        <>
          <div className="mapBlock">
            <YandexMap destination={orders[0].address} />
            <h2>Address: {orders[0].address}</h2>
            <button className="filleadButton" onClick={() => completeOrder(orders[0].id)}>
              Complete An Order
            </button>
            <button className="filleadButton" onClick={() => deleteOrder(orders[0].id)}>
              Delete An Order
            </button>
          </div>

          {orders.map((order) => {
            if (!order.Dishes || order.Dishes.length === 0) {
              return null;
            }

            const totalPrice = order.Dishes.reduce((total, dish) => {
              return total + dish.price * dish.OrderDish.quantity;
            }, 0);

            return (
              <div className="activeOrderBlock" key={order.id}>
                {order.Dishes.map((dish) => (
                  <div className="activeOrderCard" key={dish.id}>
                    <img src={dish.photo} alt={dish.name} />
                    <div>
                      <p>{dish.name}</p>
                      <p>× {dish.OrderDish.quantity}</p>
                    </div>
                    <h2>${(dish.price * dish.OrderDish.quantity).toFixed(2)}</h2>
                  </div>
                ))}
                <hr />
                <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
              </div>
            );
          })}
        </>
      ) : (
        <p>Все заказы завершены.</p> 
      )}
    </div>
  );
};

export default ActiveOrder;