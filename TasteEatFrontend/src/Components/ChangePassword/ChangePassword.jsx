import React, { useState } from "react";
import "./ChangePassword.css";
import { selectUserId, selectUserRole } from "../../Store/authStore";
import { useSelector } from "react-redux";

const ChangePassword = ({ isOpen, onClose }) => {
  const userId = useSelector(selectUserId);
  const role = useSelector(selectUserRole);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
        setError("Пожалуйста, заполните все поля");
        return;
      }

    try {
      const response = await fetch(
        "http://localhost:3000/api/authorization/change",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: userId,
            role,
            oldPassword: currentPassword,
            newPassword,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Ошибка при изменении пароля");
        return;
      }

      const data = await response.json();
      setSuccessMessage(data.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setError("");
    } catch (error) {
      console.error("Ошибка:", error);
      setError("Ошибка при отправке запроса");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popupOverlay">
      <div className="popupContent">
        <h2>Изменить пароль</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Текущий пароль:</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Новый пароль:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Подтвердите новый пароль:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
          <button type="submit">Сохранить</button>
          <button type="button" onClick={onClose}>
            Закрыть
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
