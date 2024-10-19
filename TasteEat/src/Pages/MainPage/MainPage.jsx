import React from "react";
import Header from "../../Components/Header/Header";
import "./MainPage.css";
import ThesisCard from "../../Components/ThesisCard/ThesisCard";
const MainPage = () => {
  return (
    <div>
      <Header />
      <section className="mainSection">
        <div className="mainText">
          <h1 className="mainH">Welcome To Restaurant</h1>
          <p className="mainP">
            The people, food and the prime locations make the perfect place good
            friends & family to come together and have great time.
          </p>
          <button className="contoureButton">View Menu</button>
        </div>
        <img src="./Images/MainPhoto.png" alt=""></img>
      </section>
      <ThesisCard />
      <section className="informationSection">
        <img src="./Images/cafePage.png" alt=""></img>
        <div>
          <div>
            <h3>The Delicious Story</h3>
            <p>
              The people, food and the prime locations make the perfect place
              for the friends & family to come together and have great time.
            </p>
          </div>
          <div>
            <div>
              <h3>2018</h3>
              <p>Plan for this restaurant to deliver healthy food.</p>
            </div>
            <div>
              <h3>2020</h3>
              <p>Happily in the fourth year by fulfill the motto.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
