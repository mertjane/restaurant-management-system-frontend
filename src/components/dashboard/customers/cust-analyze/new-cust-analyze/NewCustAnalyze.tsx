import "../cust-analyze.component.scss";
import { DownIcon, NewCustomerIcon } from "../../../../../lib/icons/Icons";

const NewCustAnalyze = () => {
  return (
    <div className="section">
      <NewCustomerIcon />
      <div className="content-wrapper">
        <span>New Customers</span>
        <strong>2</strong>
        <div className="report">
          <DownIcon /> <span className="percentage fail">1%</span>
          <span>this month</span>
        </div>
      </div>
    </div>
  );
};

export default NewCustAnalyze;
