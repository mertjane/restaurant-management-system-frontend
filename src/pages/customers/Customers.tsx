import React from "react";
import "./customers.component.scss";
import Table from "../../components/customers-table/Table";


const Customers: React.FC = () => {
  return (
    <div className="cust-container">
      <Table />
    </div>
  );
};

export default Customers;
