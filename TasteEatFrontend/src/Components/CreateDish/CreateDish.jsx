import React, { useState } from "react";

const CreateDish = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [calories, setCalories] = useState("");
  const [fat, setFat] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dishData = {
      name,
      description,
      category,
      weight,
      price,
      photo,
      calories,
      fat,
      protein,
      carbs,
    };

    try {
      const response = await fetch("http://localhost:3000/api/dish/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dishData),
      });

      if (!response.ok) {
        throw new Error("Ошибка при создании блюда");
      }

      const newDish = await response.json();
      setSuccess(`Блюдо "${newDish.name}" успешно создано!`);
      setError(null);
      setName("");
      setDescription("");
      setCategory("");
      setWeight("");
      setPrice("");
      setPhoto("");
      setCalories("");
      setFat("");
      setProtein("");
      setCarbs("");
      onDishCreated(); 
    } catch (error) {
      setError(error.message);
      setSuccess(null);
    }
  };

  return (
    <div>
      <h2>Создать новое блюдо</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Название:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Описание:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Категория:</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <div>
          <label>Вес:</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
        </div>
        <div>
          <label>Цена:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <label>Фото (URL):</label>
          <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} required />
        </div>
        <div>
          <label>Калории:</label>
          <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} required />
        </div>
        <div>
          <label>Жиры:</label>
          <input type="number" value={fat} onChange={(e) => setFat(e.target.value)} required />
        </div>
        <div>
          <label>Белки:</label>
          <input type="number" value={protein} onChange={(e) => setProtein(e.target.value)} required />
        </div>
        <div>
          <label>Углеводы:</label>
          <input type="number" value={carbs} onChange={(e) => setCarbs(e.target.value)} required />
        </div>
        <button type="submit">Создать блюдо</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default CreateDish;