import React from "react";
import "./checkedItems.styles.scss";
import {
  checkedItemsProps,
  CheckedStatsProps,
  SelectedDateProps,
  SelectedTimeProps,
} from "./checkedItems.types";

export const CheckedPeople: React.FC<checkedItemsProps> = ({
  selectedPeople,
  clearSelectedPeople,
}) => {
  // Filter out names of selected people
  const selectedNames = Object.keys(selectedPeople).filter(
    (name) => selectedPeople[name]
  );

  // Get the names up to a maximum of 3
  const namesToDisplay = selectedNames.slice(0, 2);
  const namesString = namesToDisplay.join(", ");

  return (
    <div className="checked-items-wrapper">
      <ul>
        {selectedNames.length > 0 ? (
          <li>
            {namesString}
            {selectedNames.length > 2 ? "..." : ""}
          </li> // Add ellipsis if there are more than 3 names
        ) : (
          <li></li> // Handle the case where no one is selected
        )}
      </ul>
      <span onClick={clearSelectedPeople}>Clear all</span>
    </div>
  );
};

export const CheckedStats: React.FC<CheckedStatsProps> = ({
  selectedStatus,
  clearSelectedStatus,
}) => {
  // Filter out names of selected people
  const selectedStats = Object.keys(selectedStatus).filter(
    (status) => selectedStatus[status]
  );

  const statusString = selectedStats.join(", ");

  return (
    <div className="checked-items-wrapper">
      <ul>{selectedStats.length > 0 ? <li>{statusString}</li> : <li></li>}</ul>
      <span onClick={clearSelectedStatus}>Clear all</span>
    </div>
  );
};

export const SelectedTimeRange: React.FC<SelectedTimeProps> = ({
  selectedTime,
  clearSelectedTimeRange,
}) => {
  const { startTime, endTime } = selectedTime;
  const showClearButton = startTime && endTime;

  return (
    <div className="selected-time-wrapper">
      {showClearButton && (
        <ul>
          <li>
            {startTime} - {endTime}
          </li>
        </ul>
      )}
      {showClearButton && (
        <span onClick={clearSelectedTimeRange}>Clear all</span>
      )}
    </div>
  );
};

export const SelectedDateRange: React.FC<SelectedDateProps> = ({
  selectedDate,
  clearSelectedDateRange
}) => {
  const {startDate, endDate} = selectedDate;
  const showClearButton = startDate && endDate;

  return (
    <div className="selected-date-wrapper">
      {showClearButton && (
        <ul>
          <li>
            {startDate} - {endDate}
          </li>
        </ul>
      )}
      {showClearButton && (
        <span onClick={clearSelectedDateRange}>Clear All</span>
      )}
    </div>
  )
}

export default {
  CheckedPeople,
  CheckedStats,
  SelectedTimeRange,
  SelectedDateRange
};
