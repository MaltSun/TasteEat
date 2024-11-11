import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import CartComponent from "../../Components/CartComponent/CartComponent";
import "./CartPage.css";
import { Link } from "react-router-dom";
const CartPage = () => {
  return (
    <div className="cartPage">
      <Header />
      <div className="emptyCart">
        <img src="./Images/ProfileImage.png"></img>
        <h1>Your Cart Is Empty</h1>
        <p>Добавьте что-то из меню для заказа</p>
        <Link className="filleadButton" to={{ pathname: "/menu" }}>
           Go To Menu
          </Link>
      </div>
      <div className="fullCart">
        <div className="position">
          <CartComponent />
          <div className="parentBlock">
            <div className="littleBlock">
              <h2>Способ оплаты</h2>
              <p>Войти или зарегистрироваться, чтобы выбрать способ оплаты</p>
            </div>
            <div className="littleBlock">
              <h2>Мои данные</h2>
              <p>Войти или зарегистрироваться, чтобы оформить заказ</p>
            </div>
          </div>
        </div>
        <div className="fullPrice">
          <p>Итого $5.99</p>
          <button>Заказать</button>
          <div>
            <input type="checkbox"></input>
            <label>
              Соглашаюсь с правилами пользования торговой площадки и доставки
            </label>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
