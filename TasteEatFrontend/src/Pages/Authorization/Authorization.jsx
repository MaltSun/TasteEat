import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../Store/authStore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Authorization.css";

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
      const { id, role, token } = data.user;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("userId", id);
      sessionStorage.setItem("email", email);

      if (role === "user") {
        navigate("/profile");
      } else if (role === "admin") {
        navigate("/admin");
      } else if(role === "delivery"){       
        navigate("/delivery");
      }

      
    }
  };

  return (
    <div className="authorization">
      <div>
        <h1>Authorization</h1>
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
        <span>
          <Link className="contoureButton" to={"/reg"}>
            Go To Registration
          </Link>
          <button className="contoureButton" onClick={handleAuthorization}>
            Send
          </button>
        </span>
      </div>
    </div>
  );
};

export default Authorization;
