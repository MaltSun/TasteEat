import React from "react";
import Header from "../../Components/Header/Header";
import "./MainPage.css";
import ThesisCard from "../../Components/ThesisCard/ThesisCard";
import OfferCard from "../../Components/OfferCard/OfferCard";
import Footer from "../../Components/Footer/Footer"
const MainPage = () => {
  return (
    <div className="mainPage">
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
        <div className="deliciousStory">
          <div>
            <h2>The Delicious Story</h2>
            <p>
              The people, food and the prime locations make the perfect place
              for the friends & family to come together and have great time.
            </p>
          </div>
          <div className="blockYear">
            <div className="year">
              <h2>2018</h2>
              <p>Plan for this restaurant to deliver healthy food.</p>
            </div>
            <div className="year">
              <h2>2020</h2>
              <p>Happily in the fourth year by fulfill the motto.</p>
            </div>
          </div>
        </div>
      </section>
      <img className="lanterns" img src="./Images/lanterns.png"></img>
      <section className="offerSection">
        <div className="offerText">
          <h4>What we offer</h4>
          <h2>Our Great Services</h2>
          <p>
            The atmosphere set the stage. It’s about more than just a dining
            room away from your home. food takes the spotlight as guests.
          </p>
        </div>
        <OfferCard/>
      </section>
      <Footer/>
    </div>
  );
};

export default MainPage;