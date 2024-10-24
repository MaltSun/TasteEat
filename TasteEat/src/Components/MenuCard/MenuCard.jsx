import React, { useState, useEffect } from "react";
import "./MenuCard.css";
import GridViewIcon from '@mui/icons-material/GridView';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';

const MenuCategory = ({ title, items }) => {
  return (
    <div className="menuBlock">
      <h3 className="title">{title}</h3>
      <div className="menu-category">
        {items.map((item, index) => (
          <div  key={index} className="menu-item">
            <img className="menuPhoto" src={item.photo} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <h3>{item.price}</h3>
          </div>
        ))}
      </div>
      <button onClick={More} >More</button>
    </div>
  );
};
function More (){
  
}
const MenuCard = () => {
  const [data, setData] = useState([]);
  const [starters, setStarters] = useState([]);
  const [mains, setMains] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [desserts, setDesserts] = useState([]);

  useEffect(() => {
    fetch("/Data/Menu.json")
      .then((response) => response.json())
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
      <GridViewIcon/>
<ArtTrackIcon/>
      <MenuCategory title="Starters" items={starters} />
      <MenuCategory title="Main Dishes" items={mains} />
      <MenuCategory title="Drinks" items={drinks} />
      <MenuCategory title="Desserts" items={desserts} />
    </div>
  );
};

export default MenuCard;
