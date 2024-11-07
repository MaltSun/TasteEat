import React, { useState, useEffect } from "react";
import "./ProfileComponent.css";

const ProfileComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/Data/Users.json")
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="profileComponent">
      <div className="imageBlock">
        <img className="profileImage" src="./Images/ProfileImage.png"></img>
        <button className="contoureButton ">Change profile</button>
      </div>
      <div className="informationBlock">
        <div className="smallInformationBlock">
          <p className="smallText">Username</p>
          <p className="bigText">meow meow</p>
        </div>
        <div>
          <p className="smallText">Address</p>
          <p className="bigText">jjhhhhhhhhhhhhhhjjjj</p>
        </div>
        <div>
          <p className="smallText">Email</p>
          <p className="bigText">jjjjjjjjjjjjjjjj</p>
        </div>
        <div>
          <p className="smallText">Card</p>
          <p className="bigText">kkkkjjjjjjjjjjjk</p>
        </div>
      </div>
      <div className="emailBlock">
        <div>
          <p className="smallText">Need help?</p>
          <p className="bigText">polinka041022@gmail</p>
        </div>

        <button className="contoureButton emailButton">
          <a href="polinka041022@gmail.com">Write message</a>
        </button>
      </div>
    </div>
  );
};

export default ProfileComponent;
