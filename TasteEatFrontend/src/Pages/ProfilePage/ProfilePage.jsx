import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import ProfileCard from "../../Components/ProfileComponent/ProfileComponent";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import OrderComponent from "../../Components/OrderComponent/OrderComponent";
//import OldOrderComponent from "../../Components/OldOrderComponent/OldOrderComponent";
import "./ProfilePage.css"
const ProfilePage = () => {
  return (
    <div className="profile">
      <Header />
      <ProfileCard />
      <div className="delivery">
        <h1>Delivery</h1>
        <OrderComponent />
      </div>
      <div>
        <p>Прошлые заказы</p>
        <ArrowDropDownIcon />
      </div>
      {/* <OldOrderComponent /> */}
      <Footer />
    </div>
  );
};

export default ProfilePage;
