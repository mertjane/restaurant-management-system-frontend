import React from "react";
import "../cust-analyze.component.scss";
import {
  CustomerAnalzIcon,
  DownIcon,
  UpIcon,
} from "../../../../../lib/icons/Icons";
import { CustomerAnalyticsData } from "../../../../../lib/types/customers.types";

interface Props {
  data?: CustomerAnalyticsData;
}

const TotalCustAnalyze: React.FC<Props> = ({ data }) => {
  if (!data) {
    return <p>Invalid or incomplete data</p>; // Fallback for invalid data
  }

  const change = data.newCustsChange;
  const isPositive = change >= 0;
  const ChangeIcon = isPositive ? UpIcon : DownIcon;

  return (
    <div className="section">
      <CustomerAnalzIcon />

      <div className="content-wrapper">
        <span>Total Customers</span>
        <strong>{data?.totalCusts}</strong> {/* Display total customers */}
        <div className="report">
          <ChangeIcon />
          <span className={`percentage ${isPositive ? "success" : "fail"}`}>
            {data?.totalCustsChange?.toFixed()}%
          </span>{" "}
          {/* Display total customers change */}
          <span>this month</span>
        </div>
      </div>
    </div>
  );
};

export default TotalCustAnalyze;
