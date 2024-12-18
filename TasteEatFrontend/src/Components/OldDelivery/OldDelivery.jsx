import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserId, selectUserRole } from "../../Store/authStore";

const OldOrderComponent = ({ customerId }) => {
  const [orders, setOrders] = useState([]);
  const userId = sessionStorage.getItem('userId'); 

  useEffect(() => {
    const PORT = import.meta.env.VITE_PORT;
    const fetchDetails = async () => {
      if (!userId) {
        console.error("User ID not found in sessionStorage");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:${PORT}/api/order/completed/deliverer/${userId}`
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

    fetchDetails();
  }, [customerId, userId]);

  return (
    <div className="oldOrderComponent">
      {orders.length > 0 ? (
        orders.map((order) => (
          <div className="oldCard" key={order.id}>
            <div>
              <h1>Order №{order.id}</h1>
              <p>Issue at: {new Date(order.createdAt).toLocaleString()}</p>
              <p>Completed at: {new Date(order.updatedAt).toLocaleString()}</p>
              <p>Address: {order.address}</p>
            </div>
            <div className="check">
              <h2>Complete: {order.deliveryId || "Неизвестно"}</h2>

              <button className="filleadButton">Get A Check</button>
            </div>
          </div>
        ))
      ) : (
        <div className="noOrders">
          <img src="./Images/ProfileImage.png"></img>
          <h1>No Completed Orders Yet</h1>
        </div>
      )}
    </div>
  );
};

export default OldOrderComponent;
