import React, { useState } from "react";
import "./Filter.styles.scss";
import { EditIcon, FilterIcon } from "../icons/Icons";
import { FilterProps } from "./Filter.types";
import { FilterSidebar } from "../sidebar/Sidebar";
import CheckedItems from "../checkedItems/checkedItems";

const Filter: React.FC<FilterProps> = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [selectedPeople, setSelectedPeople] = useState<{
    [key: string]: boolean;
  }>({}); // State for selectedPeople

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCheckboxChange = (custName: string) => {
    setSelectedPeople((prev) => ({
      ...prev,
      [custName]: !prev[custName],
    }));
  };

  const selectedNames = Object.keys(selectedPeople).filter(
    (name) => selectedPeople[name]
  );

  // Function to clear selected people
  const clearSelectedPeople = () => {
    setSelectedPeople({}); // Reset selectedPeople to an empty object
  };

  return (
    <div className="filter-container">
      <div className="wrapper" onClick={toggleSidebar}>
        <FilterIcon />
        <p>Filter</p>
      </div>
      {selectedNames.length > 0 && (
        <CheckedItems selectedPeople={selectedPeople} clearSelectedPeople={clearSelectedPeople}/>
      )}
      <div className="wrapper">
        <EditIcon />
        <p>New Booking</p>
      </div>

      {/* Overlay */}
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      {/* Sidebar */}
      <FilterSidebar
        selectedPeople={selectedPeople} // Pass selectedPeople to FilterSidebar
        onCheckboxChange={handleCheckboxChange} // Pass handleCheckboxChange function
        isSidebarOpen={isSidebarOpen}
        clearSelectedPeople={clearSelectedPeople}
      />
    </div>
  );
};

export default Filter;
