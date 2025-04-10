import React from "react";
import "./dropdown.component.scss";

const SelectStatus = () => {
  return (
    <div className="dropdown-content">
      <div className="radio-wrapper">
        <label className="status-option">
          <input type="radio" name="status" value="pending" />
          <span className="custom-radio"></span>
          <span>Pending</span>
        </label>

        <label className="status-option">
          <input type="radio" name="status" value="confirmed" />
          <span className="custom-radio"></span>
          <span>Confirmed</span>
        </label>

        <label className="status-option">
          <input type="radio" name="status" value="cancelled" />
          <span className="custom-radio"></span>
          <span>Cancelled</span>
        </label>
      </div>
    </div>
  );
};

export default SelectStatus;
