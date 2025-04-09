import "./cust-analyze.component.scss";
import NewCustAnalyze from "./new-cust-analyze/NewCustAnalyze";
import PeakCustDays from "./peak-cust-days/PeakCustDays";
import TotalCustAnalyze from "./total-cust-analyze/TotalCustAnalyze";

const CustAnalyze = () => {
  return (
    <div className="wrapper">
      <TotalCustAnalyze />
      <NewCustAnalyze />
      <PeakCustDays />
    </div>
  );
};

export default CustAnalyze;
