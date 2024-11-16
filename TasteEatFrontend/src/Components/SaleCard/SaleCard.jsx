import React, { useState, useEffect } from "react";
import "./SaleCard.css";

const SaleCard = () => {
  const [data, setData] = useState([]);
  const [randomImage, setRandomImage] = useState(null); 
  const [showPopup, setShowPopup] = useState(true); 

  useEffect(() => {
    fetch("/Data/SaleCard.json")
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        const randomIndex = Math.floor(Math.random() * jsonData.length); 
        setRandomImage(jsonData[randomIndex]); 
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      {showPopup && randomImage && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-btn" onClick={closePopup}>
              X
            </button>
            <img src={randomImage.path} alt="Sale" />
          </div>
        </div>
      )}
    </div>
  );
};

export default SaleCard;
