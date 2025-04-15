import { CiCalendarDate } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import "./dropdown.component.scss";
import { AppDispatch, RootState } from "../../../../lib/redux/store";
import { setBookingFilters } from "../../../../lib/redux/slices/filterSlice";

const DateRange = () => {
  const { startDate, endDate } = useSelector(
    (state: RootState) => state.filter.bookings
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleStartDateChange = (e: any) => {
    dispatch(setBookingFilters({ startDate: e.target.value, endDate }));
  };

  const handleEndDateChange = (e: any) => {
    dispatch(setBookingFilters({ startDate, endDate: e.target.value }));
  };

  return (
    <div className="dropdown-content">
      <div className="input-control">
        <label htmlFor="startDate">Start date</label>
        <input
          type="date"
          name="startDate"
          value={startDate || ""}
          onChange={handleStartDateChange}
          id="startDate"
        />
        <CiCalendarDate className="calendar-icon" size={25} />
      </div>
      <div className="input-control">
        <label htmlFor="endDate">End date</label>
        <input
          type="date"
          name="endDate"
          value={endDate || ""}
          onChange={handleEndDateChange}
          id="endDate"
        />
        <CiCalendarDate className="calendar-icon" size={25} />
      </div>
    </div>
  );
};

export default DateRange;
