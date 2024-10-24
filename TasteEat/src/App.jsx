import { useState } from "react";
import MainPage from "./Pages/MainPage/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuPage from "./Pages/MenuPage/MenuPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/menu" element={<MenuPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
