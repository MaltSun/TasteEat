import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; // Импортируйте useHistory для навигации
import "./MenuCard.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ArtTrackIcon from "@mui/icons-material/ArtTrack";
import GridViewIcon from "@mui/icons-material/GridView";

const MenuCategory = ({ title, items, isHorizontal }) => {
  const [visibleItems, setVisibleItems] = useState(4);

  const handleMoreClick = () => {
    setVisibleItems((prev) => prev + 4); // Увеличиваем количество отображаемых позиций
  };

  const handleHideClick = () => {
    setVisibleItems((prev) => Math.max(prev - 4, 4)); // Уменьшаем количество до 4
  };

  return (
    <div className="menuBlock">
      <h2 className="titleUnder">{title}</h2>
      <div className="menuCategory">
        {items.slice(0, visibleItems).map((item) => (
          <div
            key={item.id}
            className={`menuItem ${isHorizontal ? "menuItemHorizontal" : ""}`}
          >
            <div className="basketBlock">
              <AddShoppingCartIcon />
              <ShoppingBasketIcon className="fullBasket" />
            </div>
            <img className="menuPhoto" src={item.photo} alt={item.name} />
            <div>
              <h3 className="title">{item.name}</h3>
              <p>{item.description}</p>
              <h3>{item.price}</h3>
            </div>
          </div>
        ))}
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

const MenuCard = () => {
  const [data, setData] = useState([]);
  const [starters, setStarters] = useState([]);
  const [mains, setMains] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [isHorizontal, setIsHorizontal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/dishes") // Запрос к вашему API
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData);
        setStarters(jsonData.filter((item) => item.category === "starter"));
        setMains(jsonData.filter((item) => item.category === "main"));
        setDrinks(jsonData.filter((item) => item.category === "drinks"));
        setDesserts(jsonData.filter((item) => item.category === "dessert"));
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="menuCard">
      <div className="position">
        <ArtTrackIcon
          onClick={() => setIsHorizontal(true)}
          style={{ cursor: "pointer", marginRight: "10px" }}
        />
        <GridViewIcon
          onClick={() => setIsHorizontal(false)}
          style={{ cursor: "pointer" }}
        />
      </div>

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