import { CiClock2 } from "react-icons/ci";
import "./dropdown.component.scss";
import { AppDispatch, RootState } from "../../../../lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setBookingFilters } from "../../../../lib/redux/slices/filterSlice";

const TimeRange = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { startTime, endTime } = useSelector(
    (state: RootState) => state.filter.bookings
  );

  const handleStartTimeChange = (e: any) => {
    dispatch(setBookingFilters({ startTime: e.target.value, endTime }));
  };

  const handleEndTimeChange = (e: any) => {
    dispatch(setBookingFilters({ startTime, endTime: e.target.value }));
  };

  return (
    <div className="dropdown-content">
      <div className="input-control">
        <label htmlFor="startTime">Start Time</label>
        <input
          type="time"
          name="startTime"
          value={startTime || ""}
          id="startTime"
          onChange={handleStartTimeChange}
        />
        <CiClock2 className="time-icon" size={25} />
      </div>
      <div className="input-control">
        <label htmlFor="endDate">End date</label>
        <input
          type="time"
          name="endTime"
          value={endTime || ""}
          id="endTime"
          onChange={handleEndTimeChange}
        />
        <CiClock2 className="time-icon" size={25} />
      </div>
    </div>
  );
};

export default TimeRange;
