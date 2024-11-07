import { useState } from "react";
import MainPage from "./Pages/MainPage/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuPage from "./Pages/MenuPage/MenuPage";
import OrderPage from "./Pages/OrderPage/OrderPage";
import DeliveryPage from "./Pages/DeliveryPage/DeliveryPage";
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
        </Routes>
      </BrowserRouter>
    </>
  );
}


export default App;
