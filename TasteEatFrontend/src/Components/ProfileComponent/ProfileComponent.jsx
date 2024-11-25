import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserId, selectUserRole } from "../../Store/authStore";
import "./ProfileComponent.css";

const ProfileComponent = () => {
  const userId = useSelector(selectUserId);
  const role = useSelector(selectUserRole);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (role === "customer") {
          response = await fetch(`http://localhost:3000/api/customer/${userId}`);
        } else {
          response = await fetch(`http://localhost:3000/api/deliverers/${userId}`);
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId, role]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data found</div>;
  }

  return (
    <div className="profileComponent">
      <div className="profileBlock">
        <div className="imageBlock">
          <img
            className="profileImage"
            src="./Images/ProfileImage.png"
            alt="Profile"
          />
          <button className="contoureButton">Change profile</button>
        </div>
        <div className="informationBlock">
          <div className="smallInformationBlock">
            <p className="smallText">Username</p>
            <p className="bigText">{data.username}</p>
          </div>
          <div>
            <p className="smallText">Address</p>
            <p className="bigText">{data.address}</p>
          </div>
          <div>
            <p className="smallText">Email</p>
            <p className="bigText">{data.email}</p>
          </div>
          <div>
            <p className="smallText">Card</p>
            <p className="bigText">{data.card}</p>
          </div>
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
    </div>
  );
};

export default ProfileComponent;