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
import jsPDF from "jspdf";
import SalesChart from "../../Components/SalesCharts/SalesCharts";
import { useTable, useSortBy, usePagination } from "react-table";

const AdminPage = () => {
  const salesData = [
    { month: "Январь", sales: 300 },
    { month: "Февраль", sales: 200 },
    { month: "Март", sales: 400 },
    { month: "Апрель", sales: 150 },
    { month: "Май", sales: 250 },
  ];
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

  const deleteDish = async (dishId) => {
    if (!window.confirm("Do you really want to delete this dish?")) return;
    try {
      const response = await fetch(`http://localhost:3000/api/dish/${dishId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error deleting dish");
      }
      alert("Deleted successfully");
      fetchDishes();
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchDishes();
    fetchOrders();
  }, []);

  const handleEditDish = (id) => {
    setEditingDishId(id);
  };

  const handleCloseEdit = () => {
    setEditingDishId(null);
    fetchDishes();
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

  const columns = React.useMemo(
    () => [
      { Header: "Название", accessor: "name" },
      { Header: "Описание", accessor: "description" },
      { Header: "Категория", accessor: "category" },
      { Header: "Вес", accessor: "weight" },
      { Header: "Цена", accessor: "price" },
      {
        Header: "Действия",
        accessor: "id",
        Cell: ({ cell }) => (
          <>
            <button onClick={() => handleEditDish(cell.value)}>
              <EditNoteIcon />
            </button>
            <button onClick={() => deleteDish(cell.value)}>
              <DeleteOutlineIcon />
            </button>
          </>
        ),
      },
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { pageIndex, pageSize },
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data: dishes,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  return (
    <div>
      <Header />
      <ProfileCard />
      <SalesChart salesData={salesData} />
      <button className="filleadButton" onClick={generateOrdersReport}>
        Generate Orders Report
      </button>
      <table {...getTableProps()} className="table">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      <p>Menu</p>
      <ArrowDropDownIcon />
      {/* <div className="menuCard">
        <div className="menuCategory">
          {dishes.length > 0 ? (
            dishes.map((item) => (
              <div className="menuItem" key={item.id}>
                <img className="menuPhoto" src={item.photo} alt={item.name} />
                <p className="title">{item.name}</p>
                <p className="description">{item.description}</p>
                <p className="description">Категория: {item.category}</p>
                <p>{item.weight} grams</p>
                <p>$ {item.price}</p>
                <button onClick={() => handleEditDish(item.id)}>
                  <EditNoteIcon />
                </button>
                <button onClick={() => deleteDish(item.id)}>
                  <DeleteOutlineIcon />
                </button>
              </div>
            ))
          ) : (
            <div>
              <img src="./Images/LightLogo.png" alt="No Dishes" />
              <p>Нет доступных блюд в меню.</p>
            </div>
          )}
        </div>
        {editingDishId && (
          <ChangeMenu dishId={editingDishId} onDishUpdated={handleCloseEdit} />
        )}
        <button>Create New Dish</button>
        <CreateDish onDishCreated={fetchDishes} />
      </div> */}

      <p>View Reviews</p>
      <AdminReview />

      <Footer />
    </div>
  );
};

export default AdminPage;
