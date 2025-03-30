import React from "react";
import "./checkedItems.styles.scss";
import { checkedItemsProps } from "./checkedItems.types";

const CheckedItems: React.FC<checkedItemsProps> = ({ selectedPeople, clearSelectedPeople}) => {
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

export default CheckedItems;
