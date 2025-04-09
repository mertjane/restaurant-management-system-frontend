import { SearchIcon } from "../../../../lib/icons/Icons";
import "../bookings.component.scss";

interface BookingSearchProps {
  searchTerm: string;
  onSearch: (value: string) => void;
}

const BookingsSearch = ({ searchTerm, onSearch }: BookingSearchProps) => {
  return (
    <nav className="navigation">
      <SearchIcon />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search"
      />
    </nav>
  );
};

export default BookingsSearch;
