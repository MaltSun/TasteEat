import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import ProfileCard from "../../Components/ProfileComponent/ProfileComponent";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import OrderComponent from "../../Components/OrderComponent/OrderComponent";
import OldOrderComponent from "../../Components/OldOrderComponent/OldOrderComponent";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [showOldOrders, setShowOldOrders] = useState(false);

  const toggleOldOrders = () => {
    setShowOldOrders((prev) => !prev);
  };

  return (
    <div className="profile">
      <Header />
      <ProfileCard />
      <div className="delivery">
        <h1>Delivery</h1>
        <OrderComponent />
      </div>
      <div className="oldOrder">
        <h1>Прошлые заказы</h1>
        <ArrowDropDownIcon fontSize="large" onClick={toggleOldOrders}  />
      </div>
      {showOldOrders && (
        <div id="oldOrder">
          <OldOrderComponent />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProfilePage;