import React from "react";
import "./DeliveryPage.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import ProfileComponent from "../../Components/ProfileComponent/ProfileComponent";
import YandexMap from "../../Components/YandexMap/YandexMap";
const DeliveryPage = () => {
  return (
    <div>
      <Header />
      <ProfileComponent />
      <div>
        <div>информация о текущем заказе</div>
        <YandexMap />
      </div>
      <div>
        <p>выполненные заказы</p>
      </div>
      <Footer />
    </div>
  );
};

export default DeliveryPage;
