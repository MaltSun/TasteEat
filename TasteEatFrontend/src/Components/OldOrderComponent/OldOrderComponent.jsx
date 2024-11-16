import React, { useState, useEffect } from "react";
import "./OldOrderComponent.css";
const OldOrderComponent = ({ customerId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/order/completed/customer/2`
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
  }, [customerId]);

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
