import "./filter.component.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../lib/redux/store";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { clearBookingFilters } from "../../../../lib/redux/slices/filterSlice";

const StoredFilters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { startDate, endDate, startTime, endTime, status } = useSelector(
    (state: RootState) => state.filter.bookings
  );

  const dateFilters = startDate && endDate ? [`${startDate} - ${endDate}`] : [];
  const timeFilters = startTime && endTime ? [`${startTime} - ${endTime}`] : [];
  const statusFilters = status ? [`${status}`] : [];

  const handleClearFilters = () => {
    dispatch(clearBookingFilters());
  };

  return (
    <div className="storage-box">
      {dateFilters.length > 0 && (
        <ul>
          <li>{dateFilters[0]}</li>
          <IoIosCloseCircleOutline
            className="close-ico"
            onClick={handleClearFilters}
          />
        </ul>
      )}
      {timeFilters.length > 0 && (
        <ul>
          <li>{timeFilters[0]}</li>
          <IoIosCloseCircleOutline
            className="close-ico"
            onClick={handleClearFilters}
          />
        </ul>
      )}
      {statusFilters.length > 0 && (
        <ul>
          <li>{statusFilters[0]}</li>
          <IoIosCloseCircleOutline
            className="close-ico"
            onClick={handleClearFilters}
          />
        </ul>
      )}
    </div>
  );
};

export default StoredFilters;
