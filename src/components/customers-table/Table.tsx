import React, { useContext } from "react";
import "./table.component.scss";
import Pagination from "../pagination/Pagination";
import { CustomersContext } from "../../context/CustomersContext";


const Table: React.FC = () => {
  const { customers, totalPages, loading, error, fetchCustomers } = useContext(CustomersContext)!;
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  



  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchCustomers(page); // Fetch customers when page changes
  };

  if (loading) return <div>Loading customers...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <div className="table-container">
      <h2>Customers</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {customers?.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage} // Show the correct current page in the UI
        totalPages={totalPages}
        onPageChange={handlePageChange} // Pass function to handle page change
      />
    </div>
  );
};

export default Table;
