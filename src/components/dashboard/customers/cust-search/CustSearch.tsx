import "../customers.component.scss";
import { SearchIcon } from "../../../../lib/icons/Icons";

interface CustSearchProps {
  searchTerm: string;
  onSearch: (value: string) => void;
}

const CustSearch = ({ searchTerm, onSearch }: CustSearchProps) => {
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

export default CustSearch;
