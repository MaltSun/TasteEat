import React, { useState, useEffect } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const AdminReview = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = () => {
    fetch("http://localhost:3000/api/review/resource")
      .then((response) => response.json())
      .then((jsonData) => {
        if (Array.isArray(jsonData)) {
          setData(jsonData);
        } else {
          console.error("Received data is not an array:", jsonData);
          setData([]);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const deleteReview = async (reviewId) => {
    if (window.confirm("Вы уверены, что хотите удалить этот отзыв?")) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/review/${reviewId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Ошибка при удалении отзыва");
        }

        fetchData(); 
      } catch (error) {
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data.length > 0 ? (
        data.map((item) => (
          <div key={item.id}>
            <div className="review">
              <div className="reviewHeader">
                <img
                  src={item.Customer.photo || "./Images/defaultUser.png"}
                  alt=""
                />
                <h3>
                  {item.Customer.userId === "null"
                    ? "user"
                    : item.Customer.username}
                </h3>
              </div>
              <hr />
              <DeleteOutlineIcon onClick={() => deleteReview(item.id)} />
              <p className="littleLight">{item.coment}</p>
            </div>
          </div>
        ))
      ) : (
        <div>
          <img src="./Images/LightLogo.png" alt="No reviews" />
          <p>No Review Yet</p>
        </div>
      )}
    </div>
  );
};

export default AdminReview;
