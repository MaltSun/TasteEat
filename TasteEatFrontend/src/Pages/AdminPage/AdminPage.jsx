import React, { useState, useEffect } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ProfileCard from "../../Components/ProfileComponent/ProfileComponent";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CreateDish from "../../Components/CreateDish/CreateDish";
import ChangeMenu from "../../Components/ChangeMenu/ChangeMenu";
import AdminReview from "../../Components/AdminReview/AdminReview";
const AdminPage = () => {
  const [data, setData] = useState([]);
  const [editingDishId, setEditingDishId] = useState(null);

  const fetchData = () => {
    fetch("http://localhost:3000/api/dish/resource")
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

  const deleteDish = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/dish/${dishId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dishData),
      });

      if (!response.ok) {
        throw new Error("Ошибка при удалении блюда");
      }

      fetchData();
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditDish = (id) => {
    setEditingDishId(id);
  };

  const handleCloseEdit = () => {
    setEditingDishId(null);
    fetchData();
  };
  return (
    <div>
      <Header />
      <ProfileCard />
      <p>Menu</p>
      <ArrowDropDownIcon />
      <div className="menuCard">
        <div className="menuCategory">
          {data.length > 0 ? (
            data.map((item) => (
              <div className="menuItem" key={item.id}>
                <img className="menuPhoto" src={item.photo}></img>
                <p className="title"> {item.name}</p>
                <p className="description"> {item.description}</p>
                <p className="description">Категория: {item.category}</p>
                <p> {item.weight} gramm</p>
                <p>$ {item.price}</p>
                <button onClick={() => handleEditDish(item.id)}>
                  <EditNoteIcon />
                </button>
                <button onClick={() => deleteDish(item.id)}>
                  <DeleteOutlineIcon  />
                </button>
              </div>
            ))
          ) : (
            <div>
              <img src="./Images/LightLogo.png"></img>
              <p>Нет доступных блюд в меню.</p>
            </div>
          )}
        </div>
        {editingDishId && (
          <ChangeMenu dishId={editingDishId} onDishUpdated={handleCloseEdit} />
        )}
        <button>create new</button>
        <CreateDish onDishCreated={fetchData} />
      </div>

      <p>View reviews</p>
      <AdminReview />
      <button>get sales report</button>
      <Footer />
    </div>
  );
};

export default AdminPage;
