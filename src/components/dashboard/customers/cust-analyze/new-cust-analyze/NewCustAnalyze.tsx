import "../cust-analyze.component.scss";
import {
  DownIcon,
  NewCustomerIcon,
  UpIcon,
} from "../../../../../lib/icons/Icons";
import { CustomerAnalyticsData } from "../../../../../lib/types/customers.types";

interface Props {
  data?: CustomerAnalyticsData;
}

const NewCustAnalyze = ({ data }: Props) => {
  if (!data) {
    return <p>Invalid or incomplete data</p>; // Fallback for invalid data
  }

  const change = data.newCustsChange;
  const isPositive = change >= 0;
  const ChangeIcon = isPositive ? UpIcon : DownIcon;

  return (
    <div className="section">
      <NewCustomerIcon />
      <div className="content-wrapper">
        <span>New Customers</span>
        <strong>{data.newCusts}</strong>
        <div className="report">
          <ChangeIcon />
          <span className={`percentage ${isPositive ? "success" : "fail"}`}>
            {Math.abs(change).toFixed()}%
          </span>
          <span>this month</span>
        </div>
      </div>
    </div>
  );
};

export default NewCustAnalyze;
