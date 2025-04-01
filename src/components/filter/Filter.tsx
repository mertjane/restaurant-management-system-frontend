import React, { useState } from "react";
import "./Filter.styles.scss";
import { EditIcon, FilterIcon } from "../icons/Icons";
import { FilterProps } from "./Filter.types";
import { FilterSidebar } from "../sidebar/Sidebar";
import {
  CheckedPeople,
  CheckedStats,
  SelectedDateRange,
  SelectedTimeRange,
} from "../checkedItems/CheckedItems";

const Filter: React.FC<FilterProps> = ({
  selectedDate,
  selectedTime,
  selectedPeople,
  selectedStatus,
  onCheckboxChange,
  onStatsChange,
  onTimeRangeChange,
  onDateRangeChange,
  clearSelectedPeople,
  clearSelectedStatus,
  clearSelectedTimeRange,
  clearSelectedDateRange,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const selectedNames = Object.keys(selectedPeople).filter(
    (name) => selectedPeople[name]
  );

  const selectedStats = Object.keys(selectedStatus).filter(
    (status) => selectedStatus[status]
  );

  return (
    <div className="filter-container">
      <div className="wrapper" onClick={toggleSidebar}>
        <FilterIcon />
        <p>Filter</p>
      </div>
      {selectedDate && (
        <SelectedDateRange
          selectedDate={selectedDate}
          clearSelectedDateRange={clearSelectedDateRange}
        />
      )}
      {selectedTime && (
        <SelectedTimeRange
          selectedTime={selectedTime}
          clearSelectedTimeRange={clearSelectedTimeRange}
        />
      )}

      {selectedStats.length > 0 && (
        <CheckedStats
          selectedStatus={selectedStatus}
          clearSelectedStatus={clearSelectedStatus}
        />
      )}
      {selectedNames.length > 0 && (
        <CheckedPeople
          selectedPeople={selectedPeople}
          clearSelectedPeople={clearSelectedPeople}
        />
      )}
      <div className="new-booking-wrapper">
        <EditIcon />
        <p>New Booking</p>
      </div>

      {/* Overlay */}
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      {/* Sidebar */}
      <FilterSidebar
        isSidebarOpen={isSidebarOpen} // open-sidebar prop
        // Selected People props
        selectedPeople={selectedPeople}
        onCheckboxChange={onCheckboxChange}
        clearSelectedPeople={clearSelectedPeople}
        // Selected Status props
        selectedStatus={selectedStatus}
        onStatsChange={onStatsChange}
        clearSelectedStatus={clearSelectedStatus}
        // Selected Time Range Props
        selectedTime={selectedTime}
        onTimeRangeChange={onTimeRangeChange}
        clearSelectedTimeRange={clearSelectedTimeRange}
        // Selected Date Range Props
        selectedDate={selectedDate}
        onDateRangeChange={onDateRangeChange}
        clearSelectedDateRange={clearSelectedDateRange}
      />
    </div>
  );
};

export default Filter;
