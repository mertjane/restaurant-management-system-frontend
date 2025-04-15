import "./dropdown.component.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../lib/redux/store";
import {
  setBookingSort,
  SortOption,
} from "../../../../lib/redux/slices/sortSlice";

interface SortProps {
  type: "customers" | "bookings";
}

const SortSelection = ({ type }: SortProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const sortOptions: { label: string; value: SortOption }[] = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Today", value: "today_to_future" },
  ];

  const sort = useSelector((state: RootState) => state.sort.bookings);

  const handleSortChange = (sortValue: SortOption) => {
    dispatch(setBookingSort(sortValue));
  };

  return (
    <div className="dropdown-content">
      <ul>
        {sortOptions.map((opt) => (
          <li key={opt.value}>
            <label className="radio-option">
              <input
                type="radio"
                name={`sort-${type}`}
                value={opt.value}
                checked={sort === opt.value}
                onChange={() => handleSortChange(opt.value)}
              />
              <span className="custom-radio"></span>
              <span>{opt.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortSelection;
