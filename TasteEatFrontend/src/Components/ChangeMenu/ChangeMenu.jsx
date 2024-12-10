import React, { useState, useEffect } from "react";

const ChangeMenu = ({ dishId, onDishUpdated }) => {
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

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/dish/${dishId}`
        );
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

    try {
      const response = await fetch(`http://localhost:3000/api/dish/${dishId}`, {
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
    <form onSubmit={handleSubmit}>
      <h2>Редактировать блюдо</h2>
      <div>
        <label>Название:</label>
        <input
          type="text"
          name="name"
          value={dishData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Фото:</label>
        <input
          type="text"
          name="name"
          value={dishData.photo}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Описание:</label>
        <textarea
          name="description"
          value={dishData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Категория:</label>
        <input
          type="text"
          name="category"
          value={dishData.category}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Вес:</label>
        <input
          type="number"
          name="weight"
          value={dishData.weight}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Цена:</label>
        <input
          type="number"
          name="price"
          value={dishData.price}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Сохранить изменения</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
};

export default ChangeMenu;