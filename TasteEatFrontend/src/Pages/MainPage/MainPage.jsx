import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "../../Components/Header/Header";
import ThesisCard from "../../Components/ThesisCard/ThesisCard";
import OfferCard from "../../Components/OfferCard/OfferCard";
import Footer from "../../Components/Footer/Footer";
import { clearCredentials } from "../../Store/authStore";
import "./MainPage.css";

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleBeforeUnload = () => {
      dispatch(clearCredentials());
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [dispatch]);

  return (
    <div className="mainPage">
      <Header />

      <section className="mainSection">
        <div className="mainText">
          <h1 className="mainH">Welcome To Restaurant</h1>

          <p className="mainP">
            The people, food and the prime locations make the perfect place for
            good friends & family to come together and have a great time.
          </p>

          <button className="contoureButton">
            <Link to={{ pathname: "/menu" }}>View Menu</Link>
          </button>
        </div>
        <img src="./Images/MainPhoto.png" alt="Main" />
      </section>

      <ThesisCard />

      <section className="informationSection">
        <img src="./Images/cafePage.png" alt="Cafe" />

        <div className="deliciousStory">
          <div>
            <h2>The Delicious Story</h2>
            <p>
              The people, food and the prime locations make the perfect place
              for friends & family to come together and have a great time.
            </p>
          </div>
          <div className="blockYear">
            <div className="year">
              <h2>2018</h2>
              <p>Plan for this restaurant to deliver healthy food.</p>
            </div>
            <div className="year">
              <h2>2020</h2>
              <p>Happily in the fourth year by fulfilling the motto.</p>
            </div>
          </div>
        </div>
      </section>

      <img className="lanterns" src="./Images/lanterns.png" alt="Lanterns" />

      <section className="offerSection">
        <div className="offerText">
          <h4>What we offer</h4>
          <h2>Our Great Services</h2>
          <p>
            The atmosphere sets the stage. It’s about more than just a dining
            room away from your home. Food takes the spotlight as guests.
          </p>
        </div>
        <OfferCard />
      </section>
      <Footer />
    </div>
  );
};

export default MainPage;
