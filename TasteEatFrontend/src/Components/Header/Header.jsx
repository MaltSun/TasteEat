import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="headerSection">
      <div className="logoSection">
        <button className="contoureButton">Call:8022 96-69-66 </button>
        <img className="logo" src=".\Images\Logo.jpg" alt="logo" />
       <Link className="filleadButton" to ={{ pathname: "/profile"}}>Go To Profile</Link>
      </div>
      <div className="line"></div>
     
        <ul className="menuList">
          <Link className="headerP" to={{ pathname: "/" }}>
            Main
          </Link>
          <Link className="headerP" to={{ pathname: "/menu" }}>
            Menu
          </Link>
          <Link className="headerP" to={{ pathname: "/cart" }}>
           Cart
          </Link>
          <Link className="headerP" to={{ pathname: "/profile" }}>
           Profile
          </Link>
          
        </ul>
    </div>
  );
};

export default Header;
