import React, { useState, useEffect } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ProfileCard from "../../Components/ProfileComponent/ProfileComponent";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CreateDish from "../../Components/CreateDish/CreateDish";
import ChangeMenu from "../../Components/ChangeMenu/ChangeMenu";
import AdminReview from "../../Components/AdminReview/AdminReview";
import AdminMenu from "../../Components/AdminMenu/AdminMenu";
import jsPDF from "jspdf";
import SalesChart from "../../Components/SalesCharts/SalesCharts";
import { useTable, useSortBy, usePagination } from "react-table";
import "./AdminPage.css";
const AdminPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [dishes, setDishes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editingDishId, setEditingDishId] = useState(null);

  const fetchDishes = () => {
    fetch("http://localhost:3000/api/dish/resource")
      .then((response) => response.json())
      .then((jsonData) => {
        if (Array.isArray(jsonData)) {
          setDishes(jsonData);
        } else {
          console.error("Received data is not an array:", jsonData);
          setDishes([]);
        }
      })
      .catch((error) => console.error("Error fetching dishes:", error));
  };

  const fetchOrders = () => {
    fetch("http://localhost:3000/api/order/")
      .then((response) => response.json())
      .then((jsonData) => {
        if (Array.isArray(jsonData)) {
          setOrders(jsonData);
        } else {
          console.error("Received data is not an array:", jsonData);
          setOrders([]);
        }
      })
      .catch((error) => console.error("Error fetching orders:", error));
  };

  useEffect(() => {
    fetchDishes();
    fetchOrders();
  }, []);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const toggleReviews = () => {
    setShowReviews((prev) => !prev);
  };

  const generateOrdersReport = () => {
    let doc = new jsPDF("p", "pt");
    doc.setFontSize(24);
    doc.text("Sales Report", 40, 60);
    doc.setFontSize(14);
    doc.text(`Date: ${new Date().toLocaleString()}`, 40, 90);
    doc.line(40, 100, 550, 100);

    let yOffset = 120;
    orders.forEach((order) => {
      doc.setFontSize(12);
      doc.text(`Order ID: ${order.id}`, 40, yOffset);
      doc.text(`Address: ${order.address}`, 40, yOffset + 20);
      doc.text(
        `Created At: ${new Date(order.createdAt).toLocaleString()}`,
        40,
        yOffset + 40
      );
      doc.text(
        `Completed At: ${new Date(order.updatedAt).toLocaleString()}`,
        40,
        yOffset + 60
      );
      doc.text(
        `Comment: ${order.coment || "Нет комментариев"}`,
        40,
        yOffset + 80
      );
      doc.text("Items:", 40, yOffset + 100);
      doc.line(40, yOffset + 110, 550, yOffset + 110);

      let itemOffset = yOffset + 120;
      let total = 0;

      order.Dishes.forEach((dish) => {
        const quantity = dish.OrderDish.quantity;
        const itemTotal = quantity * dish.price;
        total += itemTotal;

        doc.text(
          `- ${dish.name}: ${quantity} x $${dish.price.toFixed(
            2
          )} = $${itemTotal.toFixed(2)}`,
          40,
          itemOffset
        );
        itemOffset += 20;
      });

      doc.text(`Total: $${total.toFixed(2)}`, 400, itemOffset + 10);
      yOffset = itemOffset + 30;
      doc.line(40, yOffset, 550, yOffset);
      yOffset += 20;
    });

    doc.save("sales_report.pdf");
  };

  return (
    <div className="adminPage">
      <Header />
      <ProfileCard />
      {/* <SalesChart salesData={salesData} /> */}

      <div className="text">
        <h1>View Menu</h1>
        <ArrowDropDownIcon fontSize="large" onClick={toggleMenu} />
      </div>
      {showMenu && <AdminMenu />}
      <hr></hr>
      <div className="text">
        <h1> View Reviews</h1>
        <ArrowDropDownIcon fontSize="large" onClick={toggleReviews} />
      </div>
      {showReviews && <AdminReview />}

      <button className="filleadButton" onClick={generateOrdersReport}>
        Generate Orders Report
      </button>

      <Footer />
    </div>
  );
};

export default AdminPage;
