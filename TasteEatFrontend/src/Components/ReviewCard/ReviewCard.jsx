import React, { useState, useEffect } from "react";
import "./ReviewCard.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; 

const ReviewCard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/review/resource")
      .then((response) => response.json())
      .then((jsonData) => {
        console.log(jsonData);
        if (Array.isArray(jsonData)) {
          setData(jsonData);
        } else {
          console.error("Received data is not an array:", jsonData);
          setData([]);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="reviewBlock">
      <Swiper
        slidesPerView={2.5} 
        pagination={{ clickable: true }} 
        navigation 
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="review">
              <div className="reviewHeader">
                <img src="" alt=""/>
                <h3>{item.Customer.userId == "null" ? "user" : item.Customer.username}</h3>
              </div>
              <hr />
              <p className="littleLight">{item.coment}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewCard;