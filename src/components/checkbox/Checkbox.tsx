import React, { useEffect } from "react";
import "./checkbox.styles.scss";

import {
  PeopleCheckboxProps,
  SelectedTimeRangeProps,
  StatusCheckboxProps,
} from "./checkbox.types";
import { TimeIcon } from "../icons/Icons";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const PeopleCheckbox: React.FC<PeopleCheckboxProps> = ({
  selectedPeople,
  onCheckboxChange,
}) => {
  const { content } = useSelector((state: RootState) => state.bookings);

  // Log the updated state correctly after it changes
  useEffect(() => {
    console.log("Updated selectedPeople:", selectedPeople);
  }, [selectedPeople]); // Runs whenever selectedPeople changes

  const handleChange = (selectedPeople: string) => {
    onCheckboxChange(selectedPeople); // Now only passing a string
  };

  return (
    <>
      {content.map((c) => {
        const customerName = c.customer?.name;
        if (!customerName) return null; // Skip rendering if no customer name

        return (
          <li key={c.customer?.id}>
            <label htmlFor={`person-${customerName}`}>
              <input
                type="checkbox"
                id={`person-${customerName}`}
                checked={!!selectedPeople[customerName]}
                onChange={() => handleChange(customerName)}
              />
              <span className="custom-checkbox"></span>
              <span className="label-text">{customerName}</span>
            </label>
          </li>
        );
      })}
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
