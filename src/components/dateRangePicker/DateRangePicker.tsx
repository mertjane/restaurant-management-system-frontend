import React, { useState } from "react";
import "./dateRangePicker.styles.scss";
import { TimeIcon } from "../icons/Icons";
import { dateRangePickerProps } from "./dateRangePicker.types";

export const DateRangePicker: React.FC<dateRangePickerProps> = ({
  selectedDate,
  onDateRangeChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onDateRangeChange(name, value); // Call the prop function with updated time values
  };

  return (
    <div className="date-range-picker" onClick={(e) => e.stopPropagation()}>
      <label>
        Start Date
        <input
          type="date"
          name="startDate"
          value={selectedDate.startDate}
          onChange={handleChange}
          min={new Date().toISOString().split("T")[0]} // Prevent selecting past dates
        />
        <span className="date-icon">
          <TimeIcon />
        </span>
      </label>
      <label>
        End Date
        <input
          type="date"
          name="endDate"
          value={selectedDate.endDate}
          onChange={handleChange}
          min={selectedDate.startDate}
        />
        <span className="date-icon">
          <TimeIcon />
        </span>
      </label>
    </div>
  );
};

export default DateRangePicker;
