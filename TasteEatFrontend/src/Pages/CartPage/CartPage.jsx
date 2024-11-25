import React from "react";
import { useSelector } from "react-redux";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import CartComponent from "../../Components/CartComponent/CartComponent";
import "./CartPage.css";
import { Link } from "react-router-dom";
import { selectCartItems } from "../../Store/cartStore";
import { selectUserId } from "../../Store/authStore";
const CartPage = () => {
  const cart = useSelector(selectCartItems);
  const itemCount = cart.items ? cart.items.length : 0;
  const userId = useSelector(selectUserId);

  console.log("Cart from Redux:", cart);
  return (
    <div className="cartPage">
      <Header />
      {cart && cart.length > 0 ? (
        <div className="fullCart">
          <div className="position">
            <CartComponent />
            <div className="parentBlock">
              {!userId && ( 
                <>
                  <div className="littleBlock">
                    <h2>Способ оплаты</h2>
                    <Link to={{ pathname: "/login" }}>
                      <b>Войти или зарегистрироваться,</b> чтобы выбрать способ
                      оплаты
                    </Link>
                  </div>
                  <div className="littleBlock">
                    <h2>Мои данные</h2>
                    <Link to={{ pathname: "/login" }}>
                      <b>Войти или зарегистрироваться,</b> чтобы оформить заказ
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="fullPrice">
            <p>Итого $5.99</p>
            <Link className="filleadButton" to={{ pathname: "/login" }}>
              Заказать
            </Link>
            <div>
              <input type="checkbox"></input>
              <label>
                Соглашаюсь с правилами пользования торговой площадки и доставки
              </label>
            </div>
          </div>
        </div>
      ) : (
        <div className="emptyCart">
          <img src="./Images/ProfileImage.png"></img>
          <h1>Your Cart Is Empty</h1>
          <p>Добавьте что-то из меню для заказа</p>
          <Link className="filleadButton" to={{ pathname: "/menu" }}>
            Go To Menu
          </Link>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default CartPage;
