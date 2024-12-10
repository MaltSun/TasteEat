import React, { useState, useEffect } from "react";
import "./ProfileComponent.css";
import ChangePassword from "../ChangePassword/ChangePassword";

const ProfileComponent = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    const role = sessionStorage.getItem("role");

    const fetchData = async () => {
      try {
        let response;
        if (role === "deliverer") {
          response = await fetch(
            `http://localhost:3000/api/deliverers/${userId}`
          );
        } else {
          response = await fetch(
            `http://localhost:3000/api/customer/${userId}`
          );
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); 
      }
    };

    if (userId) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="profileComponent">
      <div className="profileBlock">
        <div className="imageBlock">
          <img
            className="profileImage"
            src="./Images/ProfileImage.png"
            alt="Profile"
          />
          <button
            className="contoureButton"
            onClick={() => setChangePasswordOpen(true)}
          >
            Change password
          </button>
        </div>
        <div className="informationBlock">
          <div className="smallInformationBlock">
            <p className="smallText">Username</p>
            <p className="bigText">{data?.username || "Не указано"}</p>
          </div>
          {/* <div>
            <p className="smallText">Address</p>
            <p className="bigText">{data?.address || "Не указано"}</p>
          </div> */}
          <div>
            <p className="smallText">Email</p>
            <p className="bigText">{data?.email || "Не указано"}</p>
          </div>
          {/* <div>
            <p className="smallText">Card</p>
            <p className="bigText">{data?.card || "Не указано"}</p>
          </div> */}
        </div>
      </div>

      <div className="emailBlock">
        <div>
          <p className="smallText">Need help?</p>
          <p className="bigText">polinka041022@gmail.com</p>
        </div>

        <button className="contoureButton emailButton">
          <a href="mailto:polinka041022@gmail.com">Write message</a>
        </button>
      </div>

      <ChangePassword
        isOpen={isChangePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
      />
    </div>
  );
};

export default ProfileComponent;
