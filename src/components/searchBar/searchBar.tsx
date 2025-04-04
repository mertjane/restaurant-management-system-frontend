import React from "react";
import "./searchBar.styles.scss";
import { searchBarProps } from "./searchBar.types";
import { SearchIcon } from "../icons/Icons";
import { useBookingSearch } from "../../hooks/useBookingSearch";
import { useCustomer } from "../../hooks/useCustomer";

const SearchBar: React.FC<searchBarProps> = ({ placeholder = "Search..." }) => {
    const {
        searchInput: bookingSearchInput,
        handleInputChange: handleBookingInputChange,
        isSearching: isBookingSearching,
    } = useBookingSearch();

    const {
        searchInput: customerSearchInput,
        handleInputChange: handleCustomerInputChange,
        isSearching: isCustomerSearching,
    } = useCustomer();

    // Use a single input value and combine the handlers
    const handleCombinedInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        // Call both handlers with the same input value
        handleBookingInputChange(e);
        handleCustomerInputChange(e);
    };

    // Use one of the searchInput values (they'll be the same since we're syncing them)
    const searchInput = bookingSearchInput || customerSearchInput;
    const isSearching = isBookingSearching || isCustomerSearching;

    return (
        <div className="search-container">
            <div className="search-wrapper">
                <SearchIcon />
                <input
                    type="text"
                    name="search-booking"
                    id="search-booking"
                    autoComplete="off"
                    placeholder={placeholder}
                    value={searchInput}
                    onChange={handleCombinedInputChange}
                />
            </div>
        </div>
    );
};

export default SearchBar;
