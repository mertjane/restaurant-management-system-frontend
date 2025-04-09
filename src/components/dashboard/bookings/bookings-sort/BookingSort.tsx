import { FilterIcon } from "../../../../lib/icons/Icons";
import "../bookings.component.scss"

const BookingSort = () => {
  return (
    <div className="sort-wrapper">
      <label>
        Filter & Sort
        <FilterIcon />
      </label>
    </div>
  );
};

export default BookingSort;
