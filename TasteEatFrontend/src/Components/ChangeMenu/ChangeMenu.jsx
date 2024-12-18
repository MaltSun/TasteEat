import React, { useState, useEffect } from "react";
import "./ChangeMenu.css"; 

const ChangeMenu = ({ dishId, onDishUpdated, onClose }) => {
  const [dishData, setDishData] = useState({
    name: "",
    description: "",
    photo: "",
    category: "",
    weight: "",
    price: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const categories = ["main", "dessert", "drinks", "starter"]; 

  useEffect(() => {
    const fetchDish = async () => {
      const PORT = import.meta.env.VITE_PORT; 
      try {
        const response = await fetch(`http://localhost:${PORT}/api/dish/${dishId}`);
        const data = await response.json();
        setDishData(data);
      } catch (error) {
        console.error("Error fetching dish:", error);
      }
    };

    fetchDish();
  }, [dishId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDishData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const PORT = import.meta.env.VITE_PORT;
    try {
      const response = await fetch(`http://localhost:${PORT}/api/dish/${dishId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dishData),
      });

      if (!response.ok) {
        throw new Error("Ошибка при обновлении блюда");
      }

      const updatedDish = await response.json();
      setSuccess(`Блюдо "${updatedDish.name}" успешно обновлено!`);
      setError(null);
      onDishUpdated(); 
    } catch (error) {
      setError(error.message);
      setSuccess(null);
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Change dish</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={dishData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Photo:</label>
            <input
              type="text"
              name="photo"
              value={dishData.photo}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={dishData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Category:</label>
            <select
              name="category"
              value={dishData.category}
              onChange={handleChange}
              required
            >
              <option value="">Choose category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={dishData.price}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Save</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default ChangeMenu;