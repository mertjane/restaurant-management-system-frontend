import React, { useContext, useEffect } from "react";
import "./checkbox.styles.scss";

import {
  PeopleCheckboxProps,
  SelectedTimeRangeProps,
  StatusCheckboxProps,
} from "./checkbox.types";
import { TimeIcon } from "../icons/Icons";

export const PeopleCheckbox: React.FC<PeopleCheckboxProps> = ({
  selectedPeople,
  onCheckboxChange,
}) => {
  

  

  // Log the updated state correctly after it changes
  useEffect(() => {
    console.log("Updated selectedPeople:", selectedPeople);
  }, [selectedPeople]); // Runs whenever selectedPeople changes

  const handleChange = (selectedPeople: string) => {
    onCheckboxChange(selectedPeople); // Now only passing a string
  };

  return (
    <>
      <li>
        <label htmlFor="person">
          <input
            type="checkbox"
            name="person"
            id="person"
            /* checked={!!selectedPeople[b.customer.name]} */
          />
          <span className="custom-checkbox"></span>
          <span className="label-text"></span>
        </label>
      </li>
    </>
  );
};

export const StatusCheckbox: React.FC<StatusCheckboxProps> = ({
  selectedStatus,
  onStatsChange,
}) => {
  const statusOptions = ["Pending", "Cancelled", "Confirmed"];

  const handleChange = (status: string) => {
    onStatsChange(status); // Now only passing a string
  };

  return (
    <>
      {statusOptions.map((s) => (
        <li key={s}>
          <label htmlFor={`status-${s}`}>
            <input
              type="checkbox"
              name={`status-${s}`}
              id={`status-${s}`}
              checked={!!selectedStatus[s]} // Ensure boolean value
              onChange={() => handleChange(s)}
            />
            <span className="custom-checkbox"></span>
            <span className="label-text">{s}</span>
          </label>
        </li>
      ))}
    </>
  );
};

export const TimeRangePicker: React.FC<SelectedTimeRangeProps> = ({
  selectedTime,
  onTimeRangeChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onTimeRangeChange(name, value); // Call the prop function with updated time values
  };

  return (
    <div className="time-range-picker" onClick={(e) => e.stopPropagation()}>
      <label>
        Start Time
        <input
          type="time"
          name="startTime"
          value={selectedTime.startTime}
          onChange={handleChange}
        />
        <span className="date-icon">
          <TimeIcon />
        </span>
      </label>
      <label>
        End Time
        <input
          type="time"
          name="endTime"
          value={selectedTime.endTime}
          onChange={handleChange}
        />
        <span className="date-icon">
          <TimeIcon />
        </span>
      </label>
    </div>
  );
};

export default {
  StatusCheckbox,
  PeopleCheckbox,
  TimeRangePicker,
};
