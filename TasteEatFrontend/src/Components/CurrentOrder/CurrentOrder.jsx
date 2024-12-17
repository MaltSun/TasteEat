import React, { useState, useEffect } from "react";
import "./CurrentOrder.css";

const CurrentOrder = ({ deliveryId }) => {
  const [orders, setOrders] = useState([]);
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    fetchDetails();
  }, [deliveryId]);

  const fetchDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/order/current/deliverer/`
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

  const acceptOrder = async (orderId, userId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/order/accept/${orderId}/${userId}`,
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
      fetchDetails();
      window.location.reload();
    } catch (error) {
      console.error("Ошибка при принятии заказа:", error);
    }
  };

  return (
    <div className="currentOrder">
      {orders.length > 0 ? (
        orders.map((order) => (
          <div className="currentCard" key={order.id}>
            <div>
              <h1>Order №{order.id}</h1>
              <p>Issue at: {new Date(order.createdAt).toLocaleString()}</p>
              <p>Address: {order.address}</p>
             
              <button
                className="filleadButton"
                onClick={() => acceptOrder(order.id, userId)}
              >
                Accept 
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="noOrders">
          <img src="./Images/ProfileImage.png" alt="No orders" />
          <h1>No Completed Orders Yet</h1>
        </div>
      )}
    </div>
  );
};

export default CurrentOrder;
