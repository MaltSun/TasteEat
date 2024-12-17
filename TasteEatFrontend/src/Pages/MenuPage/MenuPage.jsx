import React, { useState } from "react";
import "./MenuPage.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import SaleCard from "../../Components/SaleCard/SaleCard";
import MenuCard from "../../Components/MenuCard/MenuCard";
import ReviewCard from "../../Components/ReviewCard/ReviewCard";
import CommentCard from "../../Components/CommentCard/CommentCard";
import ArtTrackIcon from "@mui/icons-material/ArtTrack";
import GridViewIcon from "@mui/icons-material/GridView";
import {
  ToggleButtonGroup,
  ToggleButton,
  Select,
  MenuItem,
  Slider,
  Typography,
} from "@mui/material";
import "./MenuPage.css"
const MenuPage = () => {
  const [isHorizontal, setIsHorizontal] = useState(false);
  const [view, setView] = useState("list");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);

  const handleChangeView = (event, newView) => {
    if (newView !== null) {
      setView(newView);
      setIsHorizontal(newView === "module");
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <div>
      <Header />
      <SaleCard />

      <div className="position">
        <ArtTrackIcon
          onClick={() => setIsHorizontal(true)}
          style={{ cursor: "pointer", marginRight: "10px" }}
        />
        <GridViewIcon
          onClick={() => setIsHorizontal(false)}
          style={{ cursor: "pointer" }}
        />

        <Select
          value={category}
          onChange={handleCategoryChange}
          displayEmpty
          style={{ marginLeft: "10px", minWidth: "120px" }}
        >
          <MenuItem value="">
            <em>All Categories</em>
          </MenuItem>
          <MenuItem value="starter">Starters</MenuItem>
          <MenuItem value="main">Main Dishes</MenuItem>
          <MenuItem value="drinks">Drinks</MenuItem>
          <MenuItem value="dessert">Desserts</MenuItem>
          <MenuItem value="price">
            <Typography gutterBottom>
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={100}
              style={{ width: "200px", marginLeft: "20px" }}
            />
          </MenuItem>
        </Select>
      </div>

      <MenuCard
        isHorizontal={isHorizontal}
        setIsHorizontal={setIsHorizontal}
        category={category}
        priceRange={priceRange}
      />
      <section className="reviewSection">
        <div>
          <h1>Our Clients Say</h1>
          <p className="littleLight">
            We love to hear from customers, so please leave a comment or say
            hello in an email.
          </p>
        </div>
        <ReviewCard />
        <CommentCard />
      </section>
      <Footer />
    </div>
  );
};

export default MenuPage;
