import { useEffect, useState } from "react";
import "./customers.component.scss";
import CustSearch from "./cust-search/CustSearch";
import Sort from "./cust-sort/CustSort"
import { useCustomers } from "../../../lib/hooks/useCustomers";
import Pagination from "../pagination/Pagination";
import CustAnalyze from "./cust-analyze/CustAnalyze";
import { formatDateTime } from "../../../lib/utils/customer.utils";

const CustomersTable = () => {
  const pageSize = 10; // Page size (can be adjusted)
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const { data, isLoading, error } = useCustomers(
    currentPage - 1,
    pageSize,
    searchTerm
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Debounce effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchTerm(searchInput);
      setCurrentPage(1);
    }, 500); // debounce delay
    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);

  return (
    <article className="customer-container">
      <header className="analytics-header">
        <CustAnalyze />
      </header>
      <div className="customer-body">
        <div className="customer-body-hd">
          <h2>All Customers</h2>
          <CustSearch searchTerm={searchInput} onSearch={setSearchInput} />
          <Sort />
        </div>
        <table className="custom-table">
          <thead>
            <tr>
              <th># ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={4}>Loading...</td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={4}>Error fetching customers</td>
              </tr>
            )}
            {data?.content.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.phone}</td>
                <td>{customer.email}</td>
                <td>{formatDateTime(customer.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="table-footer">
          <p>
            Showing data{" "}
            {data?.content.length ? (currentPage - 1) * pageSize + 1 : 0} to{" "}
            {Math.min(currentPage * pageSize, data?.totalElements || 0)} of{" "}
            {data?.totalElements || 0} entries
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={data?.totalPages || 1}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </article>
  );
};

export default CustomersTable;
