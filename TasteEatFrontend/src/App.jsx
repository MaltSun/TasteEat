import { useState } from "react";
import MainPage from "./Pages/MainPage/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuPage from "./Pages/MenuPage/MenuPage";
import OrderPage from "./Pages/OrderPage/OrderPage";
import DeliveryPage from "./Pages/DeliveryPage/DeliveryPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import AdminPage from "./Pages/AdminPage/AdminPage";
import CartPage from "./Pages/CartPage/CartPage"
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/menu" element={<MenuPage/>} />
          <Route path="/order" element={<OrderPage/>} />
          <Route path="/delivery" element={<DeliveryPage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/admin" element={<AdminPage/>} />
          <Route path="/cart" element={<CartPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}


export default App;
