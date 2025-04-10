import BookingFilterSidebar from "../bookings-filter/BookingFilterSidebar";
import { FilterIcon } from "../../../../lib/icons/Icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../lib/redux/store";
import { toggleFilter } from "../../../../lib/redux/slices/filterSlice";
import "../bookings.component.scss";

const BookingControl = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <div className="sort-wrapper" onClick={() => dispatch(toggleFilter())}>
        <label>
          Filter & Sort
          <FilterIcon />
        </label>
      </div>
      <BookingFilterSidebar />
    </>
  );
};

export default BookingControl;
