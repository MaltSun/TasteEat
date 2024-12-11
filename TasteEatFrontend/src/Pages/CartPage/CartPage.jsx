import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import CartComponent from "../../Components/CartComponent/CartComponent";
import "./CartPage.css";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const userId = sessionStorage.getItem("userId");
  const userRole = sessionStorage.getItem("role"); // Получаем роль пользователя
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); // Используем useNavigate для перенаправления

  useEffect(() => {
    const storedCartItems =
      JSON.parse(sessionStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  const handleOrder = async () => {
    if (!userId || userRole !== "user") {
      navigate("/login");
      return;
    }

    const address = "User Address";
    const comment = "Order comment";

    const orderData = {
      customerId: userId,
      address,
      comment,
      dishItems: cartItems.map((item) => ({
        dishId: item.id,
        quantity: item.quantity || 1,
      })),
    };

    try {
      const response = await fetch("http://localhost:3000/api/order", {
       
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Ошибка при оформлении заказа");
      }

      sessionStorage.removeItem("cartItems");
      setCartItems([]);
      navigate("/");
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  return (
    <div className="cartPage">
      <Header />
      {cartItems.length > 0 ? (
        <div className="fullCart">
          <div className="position">
            <CartComponent items={cartItems} />
            <div className="parentBlock">
              <div className="littleBlock">
                <h2>Способ оплаты</h2>
                <p>Выберите способ оплаты для завершения заказа.</p>
              </div>
              <div className="littleBlock">
                <h2>Мои данные</h2>
                <p>
                  Пожалуйста, проверьте ваши данные перед оформлением заказа.
                </p>
              </div>
            </div>
          </div>
          <div className="fullPrice">
            <p>
              Итого $
              {cartItems
                .reduce(
                  (total, item) => total + item.price * (item.quantity || 1),
                  0
                )
                .toFixed(2)}
            </p>
            <button className="filleadButton" onClick={handleOrder}>
              Заказать
            </button>
            <div>
              <input type="checkbox" required />
              <label>
                Соглашаюсь с правилами пользования торговой площадки и доставки
              </label>
            </div>
          </div>
        </div>
      ) : (
        <div className="emptyCart">
          <img src="./Images/ProfileImage.png" alt="Profile" />
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
