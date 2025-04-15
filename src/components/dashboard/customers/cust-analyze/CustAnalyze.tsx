import { useEffect } from "react";
import { useGetCustomerAnalytics } from "../../../../lib/hooks/useGetCustomerAnalytics";
import { useRestaurant } from "../../../../lib/hooks/useRestaurant";
import "./cust-analyze.component.scss";
import NewCustAnalyze from "./new-cust-analyze/NewCustAnalyze";
import PeakCustDays from "./peak-cust-days/PeakCustDays";
import TotalCustAnalyze from "./total-cust-analyze/TotalCustAnalyze";
import { useGenerateCustomerAnalytics } from "../../../../lib/hooks/useGenerateCustomerAnalytics";

const CustAnalyze = () => {
  const { data: restaurant } = useRestaurant();
  const restaurantId = restaurant?.[0]?.id;
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}`;

  const generateAnalyticsMutation = useGenerateCustomerAnalytics();

  const { data: analyticsData } = useGetCustomerAnalytics(
    { restaurantId: restaurantId!, currentMonth },
    !!restaurantId
  );

  useEffect(() => {
    if (restaurantId) {
      generateAnalyticsMutation.mutate({ restaurantId, currentMonth });
    }
  }, [restaurantId]);

  // Check if analyticsData is properly populated
  if (!analyticsData) {
    return <p>No analytics data available or data is incomplete</p>;
  }

  return (
    <div className="wrapper">
      <TotalCustAnalyze data={analyticsData} />
      <NewCustAnalyze data={analyticsData}/>
      <PeakCustDays data={analyticsData}/>
    </div>
  );
};

export default CustAnalyze;
