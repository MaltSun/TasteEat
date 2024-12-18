import React, { useState, useEffect } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import { useTable, useSortBy, usePagination } from "react-table";
import CreateDish from "../CreateDish/CreateDish";
import ChangeMenu from "../ChangeMenu/ChangeMenu";
import "./AdminMenu.css";
const AdminMenu = () => {
  const [dishes, setDishes] = useState([]);
  const [editingDishId, setEditingDishId] = useState(null);
  const [showCreateDish, setShowCreateDish] = useState(false);

  const fetchDishes = () => {
    const PORT = import.meta.env.VITE_PORT;

    fetch(`http://localhost:${PORT}/api/dish/resource`)
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

  const deleteDish = async (dishId) => {
    const PORT = import.meta.env.VITE_PORT;

    if (!window.confirm("Do you really want to delete this dish?")) return;
    try {
      const response = await fetch(`http://localhost:${PORT}/api/dish/${dishId}`, {
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

  const handleEditDish = (id) => {
    setEditingDishId(id);
  };

  const handleCloseEdit = () => {
    setEditingDishId(null);
    fetchDishes();
  };

  const toggleCreateDish = () => {
    setShowCreateDish((prev) => !prev);
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  const columns = React.useMemo(
    () => [
      { Header: "Position", accessor: "name" },
      { Header: "Description", accessor: "description", width: 90 },
      { Header: "Category", accessor: "category", className: "categoryColumn"},
      { Header: "Price", accessor: "price" },
      {
        Header: "Action",
        accessor: "id",
        Cell: ({ cell }) => (
          <div style={{ display: "flex", flexWrap: "wrap"}}>
           
            <button onClick={() => handleEditDish(cell.value)}>
              <EditNoteIcon />
            </button>
            <button onClick={() => deleteDish(cell.value)}>
              <DeleteOutlineIcon />
            </button>
            <button onClick={toggleCreateDish}>
              <AddIcon />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: dishes,
        initialState: { pageIndex: 0 },
      },
      useSortBy,
      usePagination
    );

  return (
    <div className="adminMenu">
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={column.id}
                >
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
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={cell.column.id}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {editingDishId && (
        <ChangeMenu
          dishId={editingDishId}
          onDishUpdated={handleCloseEdit}
          onClose={() => setEditingDishId(null)} 
        />
      )}

      {showCreateDish && (
        <CreateDish
          onDishCreated={() => {
            fetchDishes();
            setShowCreateDish(false);
          }}
          onClose={() => setShowCreateDish(false)}
        />
      )}
    </div>
  );
};

export default AdminMenu;
