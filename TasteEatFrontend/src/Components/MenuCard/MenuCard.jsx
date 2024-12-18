import React, { useState, useEffect } from "react";
import "./MenuCard.css";
import { useDispatch, useSelector } from "react-redux";
import { setMenuData, selectMenuData } from "../../Store/menuStore";

const MenuCategory = ({ title, items, isHorizontal }) => {
  
  const [cartItems, setCartItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState(4);

  useEffect(() => {
    const storedCartItems =
      JSON.parse(sessionStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  const updateSessionStorage = (items) => {
    sessionStorage.setItem("cartItems", JSON.stringify(items));
  };

  const handleAddToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      const updatedItems = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCartItems(updatedItems);
      updateSessionStorage(updatedItems);
    } else {
      const newItem = { ...item, quantity: 1 };
      const updatedItems = [...cartItems, newItem];
      setCartItems(updatedItems);
      updateSessionStorage(updatedItems);
    }
  };

  const handleIncrease = (item) => {
    const updatedItems = cartItems.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    setCartItems(updatedItems);
    updateSessionStorage(updatedItems);
  };

  const handleDecrease = (item) => {
    const updatedItems = cartItems
      .map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
      .filter((cartItem) => cartItem.quantity > 0);
    setCartItems(updatedItems);
    updateSessionStorage(updatedItems);
  };

  const handleMoreClick = () => {
    setVisibleItems((prev) => prev + 4);
  };

  const handleHideClick = () => {
    setVisibleItems((prev) => Math.max(prev - 4, 4));
  };

  return (
    <div className="menuSection">
      <h2 className="titleUnder">{title}</h2>
      <div className="menuCategory">
        {items.slice(0, visibleItems).map((item) => {
          const quantity =
            cartItems.find((cartItem) => cartItem.id === item.id)?.quantity ||
            0;

          return (
            <div
              key={item.id}
              className={`menuItem ${isHorizontal ? "menuItemHorizontal" : ""}`}
            >
              <img className="menuPhoto" src={item.photo} alt={item.name} />
              <div>
                <h3 className="title">{item.name}</h3>
                <p className="description">{item.description}</p>
                <h3>${item.price}</h3>
                {!quantity ? (
                  <button
                    className="filleadButton"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add To Cart
                  </button>
                ) : (
                  <div className="filleadButton">
                    <button
                      onClick={() => handleDecrease({ id: item.id, quantity })}
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => handleIncrease({ id: item.id, quantity })}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {visibleItems < items.length && (
        <button className="contoureButton" onClick={handleMoreClick}>
          More
        </button>
      )}
      {visibleItems >= items.length && (
        <button className="contoureButton" onClick={handleHideClick}>
          Hide
        </button>
      )}
    </div>
  );
};

const MenuCard = ({ isHorizontal }) => {
  const dispatch = useDispatch();
  const { starters, mains, drinks, desserts } = useSelector(selectMenuData);

  useEffect(() => {
    const PORT = import.meta.env.VITE_PORT;

    fetch(`http://localhost:${PORT}/api/dish/resource`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((jsonData) => {
        const starters = jsonData.filter((item) => item.category === "starter");
        const mains = jsonData.filter((item) => item.category === "main");
        const drinks = jsonData.filter((item) => item.category === "drinks");
        const desserts = jsonData.filter((item) => item.category === "dessert");
        dispatch(setMenuData({ starters, mains, drinks, desserts }));
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [dispatch]);

  return (
    <div className="menuCard">
      <MenuCategory
        title="Starters"
        items={starters}
        isHorizontal={isHorizontal}
      />
      <MenuCategory
        title="Main Dishes"
        items={mains}
        isHorizontal={isHorizontal}
      />
      <MenuCategory title="Drinks" items={drinks} isHorizontal={isHorizontal} />
      <MenuCategory
        title="Desserts"
        items={desserts}
        isHorizontal={isHorizontal}
      />
    </div>
  );
};

export default MenuCard;
