import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <img className="logo" src="./Images/Logo.jpg" alt="" />
      <div className="footerBlock">
        <div className="firstBlock">
          <h2 className="accent">5 Rue Dalou, 75015 Paris</h2>
          <h3>+123 456 789</h3>
          <h3>josefin@mail.com</h3>
        </div>
        <div className="secondBlock">
          <h2 className="email">
            Join our mailing list for updates, Get news & offers events
          </h2>
          <div className="emailInput">
            <input className="reviewText" placeholder="Write An E-mail" type="text"></input>
            <button className="contoureButton">Subscribe</button>
          </div>
        </div>
        <div className="thirdBlock">
          <h3>Mon – Fri: 7.00am – 6.00pm</h3>
          <h3>Sat: 7.00am – 6.00pm</h3>
          <h3>Sun: 8.00am – 6.00pm</h3>
        </div>
      </div>
    </div>
  );
};

export default Footer;
