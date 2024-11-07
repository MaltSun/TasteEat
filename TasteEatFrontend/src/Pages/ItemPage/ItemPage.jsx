import React from "react";
import "./ItemPage.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
const ItemPage = (id) => {
  return (
    <div>
      <Header />
      <section>
        <div>
          <img></img>
          <div>
            <p>name</p>
            <p>состав</p>
            <p>каллорийность</p>
          </div>
        </div>
        <div>
            отзовы
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ItemPage;
