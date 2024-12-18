import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import CartComponent from "../../Components/CartComponent/CartComponent";
import OrderPopup from "../../Components/OrderPopup/OrderPopup"; // Импортируйте попап
import "./CartPage.css";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const userId = sessionStorage.getItem("userId");
  const userRole = sessionStorage.getItem("role");
  const [cartItems, setCartItems] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCartItems =
      JSON.parse(sessionStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  const handleOrder = () => {
    if (!userId || userRole !== "user") {
      alert("You don't have permission! Authorize first, please.");
      navigate("/login");
      return;
    }
    setIsPopupOpen(true); 
  };

  const confirmOrder = async ({ address, comment }) => {
    const orderData = {
      customerId: userId,
      address,
      comment,
      dishItems: cartItems.map((item) => ({
        dishId: item.id,
        quantity: item.quantity || 1,
      })),
    };
    const PORT = import.meta.env.VITE_PORT;
    try {
      const response = await fetch(`http://localhost:${PORT}/api/order`, {
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
              Make An Order
            </button>
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
      {isPopupOpen && (
        <OrderPopup
          onClose={() => setIsPopupOpen(false)}
          onConfirm={confirmOrder}
        />
      )}
    </div>
  );
};

export default CartPage;
