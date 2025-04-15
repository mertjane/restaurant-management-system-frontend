import "./dropdown.component.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../lib/redux/store";
import { setBookingFilters } from "../../../../lib/redux/slices/filterSlice";

const SelectStatus = () => {
  const { status } = useSelector((state: RootState) => state.filter.bookings);
  const dispatch = useDispatch<AppDispatch>();

  const handleStatusChange = (e: any) => {
    const selectedStatus = e.target.value;

    dispatch(setBookingFilters({ status: selectedStatus }));
  };

  return (
    <div className="dropdown-content">
      <div className="radio-wrapper">
        <label className="status-option">
          <input
            type="radio"
            name="status"
            value="Pending"
            checked={status === "Pending"}
            onChange={handleStatusChange}
          />
          <span className="custom-radio"></span>
          <span>Pending</span>
        </label>

        <label className="status-option">
          <input
            type="radio"
            name="status"
            value="Confirmed"
            checked={status === "Confirmed"}
            onChange={handleStatusChange}
          />
          <span className="custom-radio"></span>
          <span>Confirmed</span>
        </label>

        <label className="status-option">
          <input
            type="radio"
            name="status"
            value="Cancelled"
            checked={status === "Cancelled"}
            onChange={handleStatusChange}
          />
          <span className="custom-radio"></span>
          <span>Cancelled</span>
        </label>
      </div>
    </div>
  );
};

export default SelectStatus;
