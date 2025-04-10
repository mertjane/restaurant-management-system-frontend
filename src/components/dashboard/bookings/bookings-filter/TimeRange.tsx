import React, { useState } from "react";
import { CiClock2 } from "react-icons/ci";
import "./dropdown.component.scss";

const TimeRange = () => {
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  return (
    <div className="dropdown-content">
      <div className="input-control">
        <label htmlFor="startTime">Start Time</label>
        <input
          type="time"
          name="startTime"
          value={startTime}
          id="startTime"
          onChange={(e) => setStartTime(e.target.value)}
        />
        <CiClock2 className="time-icon" size={25} />
      </div>
      <div className="input-control">
        <label htmlFor="endDate">End date</label>
        <input
          type="time"
          name="endTime"
          value={endTime}
          id="endTime"
          onChange={(e) => setEndTime(e.target.value)}
        />
        <CiClock2 className="time-icon" size={25} />
      </div>
    </div>
  );
};

export default TimeRange;
