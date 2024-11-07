import React from "react";
import "./MenuPage.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import SaleCard from "../../Components/SaleCard/SaleCard";
import MenuCard from "../../Components/MenuCard/MenuCard";
const MenuPage = () => {
  return (
    <div>
      <Header />
      <SaleCard />
      <MenuCard />
      <Footer />
    </div>
  );
};

export default MenuPage;