import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const AdminReview = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = () => {
    fetch("http://localhost:3000/api/review/resource")
      .then((response) => response.json())
      .then((jsonData) => {
        if (Array.isArray(jsonData)) {
          setData(jsonData);
        } else {
          console.error("Received data is not an array:", jsonData);
          setData([]);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const deleteReview = async (reviewId) => {
    if (window.confirm("Вы уверены, что хотите удалить этот отзыв?")) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/review/${reviewId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Ошибка при удалении отзыва");
        }

        fetchData();
      } catch (error) {
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "User",
        accessor: "Customer.username",
      },
      {
        Header: "Review",
        accessor: "coment",
      },
      {
        Header: "Action",
        accessor: "id",
        Cell: ({ cell }) => (
          <button>
            <DeleteOutlineIcon onClick={() => deleteReview(cell.value)} />
          </button>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div className="adminMenu">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table {...getTableProps()} className="table2">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} key={column.id}>
                  {column.render("Header")}
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

      {data.length === 0 && (
        <div>
          <img src="./Images/LightLogo.png" alt="No reviews" />
          <p>No Review Yet</p>
        </div>
      )}
    </div>
  );
};

export default AdminReview;
