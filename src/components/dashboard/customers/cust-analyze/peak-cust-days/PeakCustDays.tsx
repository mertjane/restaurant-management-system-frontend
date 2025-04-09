import "../cust-analyze.component.scss";
import { PeakCustIcon, UpIcon } from "../../../../../lib/icons/Icons";

const PeakCustDays = () => {
  return (
    <div className="section">
      <PeakCustIcon />
      <div className="content-wrapper">
        <span>Peak Customer Days</span>
        <strong>Friday</strong>
        <div className="report">
          <UpIcon />{" "}
          <span className="percentage success">Friday</span>
          <span>this month</span>
        </div>
      </div>
    </div>
  );
};

export default PeakCustDays;
