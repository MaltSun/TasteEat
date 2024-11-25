import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../Store/authStore";
import { useNavigate } from "react-router-dom";
//import "./Authorixation.css";
const Authorization = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state) => state.auth.email);
  const password = useSelector((state) => state.auth.password);

  const handleAuthorization = async () => {
    const response = await fetch(
      "http://localhost:3000/api/authorization/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      alert(data.error || "Authorization failed");
    } else {
      console.log("Authorization successful!");
      const { id, role } = data.user;

      if (role == "customer") {
        navigate("/profile");
      } else if (role == "deliverer") {
        navigate("/delivery");
      }
      // else {
      //   navigate("/admin");
      // }
      dispatch(setCredentials({ email, password, userId: id, role }));
      dbCartItems.forEach((item) => {
        dispatch(addItemToCart(item));
      });
      dispatch(clearCart());
    }
  };

  return (
    <div>
      <label>E-mail</label>
      <input
        type="email"
        value={email}
        onChange={(e) =>
          dispatch(setCredentials({ email: e.target.value, password }))
        }
        placeholder="Input Your E-mail"
      />

      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) =>
          dispatch(setCredentials({ email, password: e.target.value }))
        }
        placeholder="Enter A password"
      />
      <button onClick={handleAuthorization}>Send</button>
    </div>
  );
};

export default Authorization;
