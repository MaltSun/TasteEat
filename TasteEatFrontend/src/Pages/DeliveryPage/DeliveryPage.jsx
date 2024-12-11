import React, { useEffect, useState } from "react";
import "./DeliveryPage.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import ProfileComponent from "../../Components/ProfileComponent/ProfileComponent";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import OldDelivery from "../../Components/OldDelivery/OldDelivery";
import CurrentOrder from "../../Components/CurrentOrder/CurrentOrder";
import ActiveOrder from "../../Components/ActiveOrder/ActiveOrder";

const DeliveryPage = () => {
  
  const [orders, setOrders] = useState([]);
  const [showOldOrders, setShowOldOrders] = useState(false);
  const [showCurrentOrders, setShowCurrentOrders] = useState(false);
  const [hasActiveOrders, setHasActiveOrders] = useState(false);
  const userId = sessionStorage.getItem("userId");

  

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/order/active/${userId}`
        );
        if (!response.ok) {
          throw new Error("Ошибка при получении заказа");
        }
        const data = await response.json();
        setOrders(data);
        setHasActiveOrders(data.length > 0);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, [userId]);

  const handleOrderComplete = () => {
    setHasActiveOrders(false); 
  };

  const toggleOldOrders = () => {
    setShowOldOrders((prev) => !prev);
  };

  const toggleCurrentOrders = () => {
    setShowCurrentOrders((prev) => !prev);
  };

  return (
    <div className="deliveryPage">
      <Header />
      <ProfileComponent />

      {hasActiveOrders ? (
        <div className="active">
          <h1>Информация о текущем заказе</h1>
          <ActiveOrder orders={orders} onOrderComplete={handleOrderComplete} />
        </div>
      ) : (
        <div className="currentOrder">
          <h1>Актуальные заказы</h1>
          <ArrowDropDownIcon fontSize="large" onClick={toggleCurrentOrders} />
        </div>
      )}

      {showCurrentOrders && (
        <div id="oldOrder">
          <CurrentOrder  orders={orders} />
        </div>
      )}

      <div className="oldOrder">
        <h1>Выполненные заказы</h1>
        <ArrowDropDownIcon fontSize="large" onClick={toggleOldOrders} />
      </div>
      {showOldOrders && (
        <div id="oldOrder">
          <OldDelivery />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default DeliveryPage;