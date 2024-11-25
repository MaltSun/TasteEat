import React, { useState, useEffect } from "react";
import "./MenuCard.css";
import { useDispatch, useSelector } from "react-redux";
import { setMenuData, selectMenuData } from "../../Store/menuStore";
import { addItemToCart } from "../../Store/cartStore";
import {
  decreaseQuantity,
  increaseQuantity,
  selectCartItems,
  deleteFromCart,
} from "../../Store/cartStore";

const MenuCategory = ({ title, items, isHorizontal }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const [addedItems, setAddedItems] = useState({});
  const [visibleItems, setVisibleItems] = useState(4);

  const handleAddToCart = (item) => {
    dispatch(addItemToCart({ ...item, quantity: 1 }));
    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
  };

  const handleIncrease = (item) => {
    dispatch(increaseQuantity(item.id));
  };

  const handleDecrease = (item) => {
    if (item.quantity === 1) {
      dispatch(deleteFromCart(item.id));
      setAddedItems((prev) => ({ ...prev, [item.id]: false }));
    } else {
      dispatch(decreaseQuantity(item.id));
    }
  };

  const handleMoreClick = () => {
    setVisibleItems((prev) => prev + 4);
  };

  const handleHideClick = () => {
    setVisibleItems((prev) => Math.max(prev - 4, 4));
  };

  return (
    <div>
      <>
        <h2 className="titleUnder">{title}</h2>
        <div className="menuCategory">
          {items.slice(0, visibleItems).map((item) => {
            const cartItem = cartItems.find(
              (cartItem) => cartItem.id === item.id
            );
            const quantity = cartItem ? cartItem.quantity : 0;

            return (
              <div
                key={item.id}
                className={`menuItem ${
                  isHorizontal ? "menuItemHorizontal" : ""
                }`}
              >
                <img className="menuPhoto" src={item.photo} alt={item.name} />
                <div>
                  <div className="textMenu">
                    <h3 className="title">{item.name}</h3>
                    <p className="description">{item.description}</p>
                    <h3>${item.price}</h3>
                  </div>

                  {!quantity ? (
                    <button
                      id="addToCard"
                      className="filleadButton"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add To Cart
                    </button>
                  ) : (
                    <div id="addedQuantity" className="filleadButton">
                      <button onClick={() => handleDecrease(cartItem)}>
                        -
                      </button>
                      <span>{quantity}</span>
                      <button onClick={() => handleIncrease(cartItem)}>
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
      </>
    </div>
  );
};

const MenuCard = ({ isHorizontal, setIsHorizontal, category, priceRange }) => {
  const dispatch = useDispatch();
  const { starters, mains, drinks, desserts } = useSelector(selectMenuData);

  useEffect(() => {
    fetch("http://localhost:3000/api/dish/resource")
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

  const filterItems = (items) => {
    return items.filter((item) => {
      const inCategory = category ? item.category === category : true;
      const inPriceRange =
        item.price >= priceRange[0] && item.price <= priceRange[1];
      return inCategory && inPriceRange;
    });
  };

  return (
    <div className="menuCard">
      <MenuCategory
        title="Starters"
        items={filterItems(starters)}
        isHorizontal={isHorizontal}
      />
      <MenuCategory
        title="Main Dishes"
        items={filterItems(mains)}
        isHorizontal={isHorizontal}
      />
      <MenuCategory
        title="Drinks"
        items={filterItems(drinks)}
        isHorizontal={isHorizontal}
      />
      <MenuCategory
        title="Desserts"
        items={filterItems(desserts)}
        isHorizontal={isHorizontal}
      />
    </div>
  );
};

export default MenuCard;
