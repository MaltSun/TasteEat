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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    const PORT = import.meta.env.VITE_PORT;
    
    window.addEventListener("resize", handleResize);
    fetch(`http://localhost:${PORT}/api/review/resource`)
      .then((response) => response.json())
      .then((jsonData) => {
        if (Array.isArray(jsonData)) {
          setData(jsonData);
        } else {
          setData([]);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getVisibleSlides = () => {
    if (windowWidth <= 600) return 1.5; 
    if (windowWidth <= 960) return 2;    
    return 2.5;                          
  };

  return (
    <div className="reviewBlock">
      {
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={60}
          totalSlides={data.length}
          visibleSlides={getVisibleSlides()} 
        >
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
          <div className="carouselControls">
            <ButtonBack className="carouselButton">back</ButtonBack>
            <ButtonNext className="carouselButton">front</ButtonNext>
          </div>
        </CarouselProvider>
      }
    </div>
  );
};

export default ReviewCard;