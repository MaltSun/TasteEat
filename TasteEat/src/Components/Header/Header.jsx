import React from "react";
import "./Header.css"

const Header = () => {
  return (
    <div className="headerSection">
      <div className="logoSection">
        <button className="contoureButton">Call:8022 96-69-66 </button>
        <img className="logo"
          src=".\Images\Logo.jpg"
          alt="logo"
        />
        <button className="filleadButton">Go to profile</button>
      </div>
      <div className="line"></div>
      <div className="menuSection">
        <ul className="menuList">
            <p className="headerP">Main</p>
            <p className="headerP">Menu</p>
            <p className="headerP">Order</p>
            <p className="headerP">Profile</p>
        </ul>
      </div>
    </div>
  );
};

export default Header;
