import React, { useState } from "react";
import "./ChangePassword.css";

const ChangePassword = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    const PORT = import.meta.env.VITE_PORT;
    if (newPassword !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Пожалуйста, заполните все поля");
      return;
    }

    const userId = sessionStorage.getItem("userId");
    const role = sessionStorage.getItem("role");

    try {
      const response = await fetch(
        `http://localhost:${PORT}/api/authorization/change`,
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
        <h2>Changing password</h2>
        <button type="button" className="closeButton" onClick={onClose}>
          ×
        </button>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
