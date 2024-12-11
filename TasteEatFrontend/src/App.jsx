import { useState, useEffect } from "react";
import MainPage from "./Pages/MainPage/MainPage";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuPage from "./Pages/MenuPage/MenuPage";
import OrderPage from "./Pages/OrderPage/OrderPage";
import DeliveryPage from "./Pages/DeliveryPage/DeliveryPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import AdminPage from "./Pages/AdminPage/AdminPage";
import CartPage from "./Pages/CartPage/CartPage";
import Registration from "./Pages/Registration/Registration";
import Authorization from "./Pages/Authorization/Authorization";
import { clearCredentials } from "./Store/authStore";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      dispatch(clearCredentials());
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/reg" element={<Registration />} />
        <Route path="/login" element={<Authorization />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route element={<PrivateRoute allowedRoles={["delivery"]} />}>
          <Route path="/delivery" element={<DeliveryPage />} />
        </Route>
        <Route element={<PrivateRoute allowedRoles={["user"]} />}></Route>
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}></Route>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
