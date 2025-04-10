import React, { useState } from "react";
import "./dropdown.component.scss";

const SortSelection = () => {
  const [selectedSort, setSelectedSort] = useState<string>("");

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
  };

  return (
    <div className="dropdown-content">
      <ul>
        <li>
          <label className="radio-option">
            <input
              type="radio"
              name="sort"
              value="Name A-Z"
              checked={selectedSort === "Name A-Z"}
              onChange={() => handleSortChange("Name A-Z")}
            />
            <span className="custom-radio"></span>
            <span>Name A-Z</span>
          </label>
        </li>
        <li>
          <label className="radio-option">
            <input
              type="radio"
              name="sort"
              value="Name Z-A"
              checked={selectedSort === "Name Z-A"}
              onChange={() => handleSortChange("Name Z-A")}
            />
            <span className="custom-radio"></span>
            <span>Name Z-A</span>
          </label>
        </li>
        <li>
          <label className="radio-option">
            <input
              type="radio"
              name="sort"
              value="Newest"
              checked={selectedSort === "Newest"}
              onChange={() => handleSortChange("Newest")}
            />
            <span className="custom-radio"></span>
            <span>Newest</span>
          </label>
        </li>
        <li>
          <label className="radio-option">
            <input
              type="radio"
              name="sort"
              value="Oldest"
              checked={selectedSort === "Oldest"}
              onChange={() => handleSortChange("Oldest")}
            />
            <span className="custom-radio"></span>
            <span>Oldest</span>
          </label>
        </li>
      </ul>
    </div>
  );
};

export default SortSelection;
