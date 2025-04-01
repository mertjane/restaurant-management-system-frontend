import React, { useEffect, useState } from "react";
import "./table.component.scss";
import Pagination from "../pagination/Pagination";
import { SecondarySortIcon } from "../icons/Icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getCustomers } from "../../api/customers";

const Table: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const size = 10;
  const { content, totalPages, loading, error } = useSelector(
    (state: RootState) => state.customers
  );
  const id = useSelector((state: RootState) => state.auth.user?.id ?? 0);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(getCustomers({ userId: id, page, size }));
  };

  useEffect(() => {
    // Dispatch the getCustomers async action
    dispatch(getCustomers({ userId: id, page: currentPage, size }));
  }, [currentPage, dispatch]);

  return (
    <div className="table-container">
      <h2>Customers</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>
                # <SecondarySortIcon />
              </th>
              <th>
                Name <SecondarySortIcon />
              </th>
              <th>
                Email <SecondarySortIcon />
              </th>
              <th>
                Phone <SecondarySortIcon />
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(content) &&
              content.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      <Pagination
        currentPage={currentPage} // Show the correct current page in the UI
        totalPages={totalPages}
        onPageChange={handlePageChange} // Pass function to handle page change
      />
    </div>
  );
};

export default Table;
