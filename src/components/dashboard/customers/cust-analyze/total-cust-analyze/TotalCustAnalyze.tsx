import React from "react";
import "../cust-analyze.component.scss"
import { CustomerAnalzIcon, UpIcon } from "../../../../../lib/icons/Icons";

const TotalCustAnalyze = () => {
  return (
    <div className="section">
      <CustomerAnalzIcon />
      <div className="content-wrapper">
        <span>Total Customers</span>
        <strong>28</strong>
        <div className="report">
          <UpIcon /> <span className="percentage success">15%</span>
          <span>this month</span>
        </div>
      </div>
    </div>
  );
};

export default TotalCustAnalyze;
