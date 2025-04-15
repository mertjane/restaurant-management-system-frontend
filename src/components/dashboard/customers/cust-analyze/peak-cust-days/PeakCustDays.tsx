import "../cust-analyze.component.scss";
import { PeakCustIcon } from "../../../../../lib/icons/Icons";
import { CustomerAnalyticsData } from "../../../../../lib/types/customers.types";

interface Props {
  data?: CustomerAnalyticsData;
}

const PeakCustDays = ({ data }: Props) => {
  // Get the day of the week
  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  const peakDayOfWeek = data?.peakDay ? getDayOfWeek(data.peakDay) : "N/A";

  return (
    <div className="section">
      <PeakCustIcon />
      <div className="content-wrapper">
        <span>Peak Customer Day</span>
        <strong>{peakDayOfWeek}</strong>
        <div className="report">
          <span className="percentage success">Friday</span>
          <span>this month</span>
        </div>
      </div>
    </div>
  );
};

export default PeakCustDays;
