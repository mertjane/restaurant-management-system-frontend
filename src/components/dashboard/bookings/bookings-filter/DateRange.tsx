import React, { useState } from "react";
import "./dropdown.component.scss";
import { CiCalendarDate } from "react-icons/ci";

const DateRange = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  return (
    <div className="dropdown-content">
      <div className="input-control">
        <label htmlFor="startDate">Start date</label>
        <input
          type="date"
          name="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          id="startDate"
        />
        <CiCalendarDate className="calendar-icon" size={25} />
      </div>
      <div className="input-control">
        <label htmlFor="endDate">End date</label>
        <input
          type="date"
          name="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          id="endDate"
        />
        <CiCalendarDate className="calendar-icon" size={25} />
      </div>
    </div>
  );
};

export default DateRange;
