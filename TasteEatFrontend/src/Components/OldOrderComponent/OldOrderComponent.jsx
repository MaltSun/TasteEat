import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserId } from "../../Store/authStore"; // Adjusted import
import "./OldOrderComponent.css";
import jsPDF from "jspdf";

const OldOrderComponent = ({ customerId }) => {
  const [orders, setOrders] = useState([]);
  const userId = sessionStorage.getItem('userId'); // Changed to sessionStorage

  useEffect(() => {
    const fetchDetails = async () => {
      if (!userId) {
        console.error("User ID not found in sessionStorage");
        return;
      }
      
      try {
        const response = await fetch(
          `http://localhost:3000/api/order/completed/customer/${userId}`
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
  }, [userId, customerId]);

  const generateInvoice = (order) => {
    let doc = new jsPDF("p", "pt");

    doc.setFontSize(24);
    doc.text("Invoice", 40, 60);
    doc.setFontSize(10);
    doc.text(`Invoice Number: ${order.id}`, 40, 90);
    doc.text("Create Date: " + new Date(order.createdAt).toLocaleString(), 40, 110);
    doc.text("Completed Date: " + new Date(order.updatedAt).toLocaleString(), 40, 130);
    doc.text(`Customer Address: ${order.address}`, 40, 150);
    doc.text(`Comment: ${order.comment || "Нет комментариев"}`, 40, 170); // Fixed typo

    doc.setFontSize(14);
    doc.text("Items:", 40, 200);
    doc.line(40, 210, 550, 210);

    doc.setFontSize(12);
    let yOffset = 240;
    let total = 0;

    order.Dishes.forEach((dish) => {
      const quantity = dish.OrderDish.quantity;
      const itemTotal = quantity * dish.price;
      total += itemTotal;

      doc.text(`Item: ${dish.name}`, 40, yOffset);
      doc.text(`Quantity: ${quantity}`, 200, yOffset);
      doc.text(`Price: $${dish.price.toFixed(2)}`, 300, yOffset);
      doc.text(`Total: $${itemTotal.toFixed(2)}`, 400, yOffset);

      yOffset += 20;
    });

    doc.line(40, yOffset, 550, yOffset);
    doc.setFontSize(14);
    doc.text(`Total: $${total.toFixed(2)}`, 400, yOffset + 30);

    doc.save(`invoice${order.id}.pdf`);
  };

  return (
    <div className="oldOrderComponent">
      {orders.length > 0 ? (
        orders.map((order) => (
          <div className="oldCard" key={order.id}>
            <div>
              <h1>Order №{order.id}</h1>
              <p>Issued at: {new Date(order.createdAt).toLocaleString()}</p>
              <p>Completed at: {new Date(order.updatedAt).toLocaleString()}</p>
              <p>Address: {order.address}</p>
            </div>
            <div className="check">
              <h2>Complete: {order.deliveryId || "Неизвестно"}</h2>
              <button
                className="filleadButton"
                onClick={() => generateInvoice(order)}
              >
                Get A Check
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="noOrders">
          <img src="./Images/ProfileImage.png" alt="Profile" />
          <h1>No Completed Orders Yet</h1>
        </div>
      )}
    </div>
  );
};

export default OldOrderComponent;