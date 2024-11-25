import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../Store/authStore";
import { selectUserId } from "../../Store/authStore";
const Header = () => {
  const role = useSelector(selectUserRole);
  const userId = useSelector(selectUserId);
  
  let cart;
  const profilePath = () => {
    if (role === "customer") {
      return "/profile";
    } else if (role === "deliverer") {
      return "/deliverer";
    } else if (role === "admin") {
      return "/admin";
    } else {
      return "/login";
    }
  };

  return (
    <div className="headerSection">
      <div className="logoSection">
        <button className="contoureButton">Call: 8022 96-69-66</button>
        <img className="logo" src="./Images/Logo.jpg" alt="logo" />
        
        <Link className="filleadButton" to={profilePath()}>
          Go To Profile
        </Link>
      </div>
      <div className="line"></div>

      <ul className="menuList">
        <Link className="headerP" to="/">
          Main
        </Link>
        <Link className="headerP" to="/menu">
          Menu
        </Link>
        <Link className="headerP" to="/cart">
          Cart
        </Link>
        <Link className="headerP" to={profilePath()}>
          Profile
        </Link>
      </ul>
    </div>
  );
};

export default Header;
