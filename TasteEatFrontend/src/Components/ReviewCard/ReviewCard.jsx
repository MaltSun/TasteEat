import React, { useState, useEffect } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "./ReviewCard.css";
import "pure-react-carousel/dist/react-carousel.es.css";

const ReviewCard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/review/resource")
      .then((response) => response.json())
      .then((jsonData) => {
        if (Array.isArray(jsonData)) {
          setData(jsonData);
        } else {
          setData([]);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={50}
      totalSlides={data.length}
      visibleSlides={2.5}
    >
       <div className="carouselControls">
          <ButtonBack className="carouselButton">back</ButtonBack>
          <ButtonNext className="carouselButton">front</ButtonNext>
        </div>
      <Slider>
        {data.map((item, index) => (
          <Slide index={index} key={index}>
            <div className="review">
              <div className="reviewHeader">
                <img src="./Images/defoltUser.png" alt="" />
                <h3>{item.Customer?.username || "Unknown User"}</h3>
              </div>
              <hr />
              <p className="littleLight">{item.coment}</p>
            </div>
          </Slide>
        ))}
       
      </Slider>
    </CarouselProvider>
  );
};

export default ReviewCard;