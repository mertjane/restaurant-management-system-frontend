import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { getBookings, searchBookings } from '../api/bookings';
import debounce from 'lodash/debounce';




interface UseBookingSearchReturn {
    searchInput: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isSearching?: boolean;
    searchError?: string | null;
};

export const useBookingSearch = (): UseBookingSearchReturn => {
    const dispatch = useDispatch<AppDispatch>();
    const restaurantId = useSelector((state: RootState) => state.restaurant.id);
    const [searchInput, setSearchInput] = useState<string>("");
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);
    const size = 10;

    // Get default bookings function ** This for when we remove the input to fetch back the bookings again.
    const fetchOriginalBookings = useCallback(() => {
        if (restaurantId) {
            dispatch(getBookings({ restaurantId, page: 1, size }))
                .unwrap()
                .catch((error: { message?: string }) => {
                    console.error("Failed to fetch bookings:", error.message || "Unknown error");
                });
        }
    }, [restaurantId, dispatch, size]);


    // Debounced search function
    const debouncedSearch = useCallback(
        debounce(async (input: string) => {
            if (!restaurantId) return;

            try {
                setIsSearching(true);
                setSearchError(null);

                if (input.trim() === "") {
                    // If search is empty, fetch original bookings
                    await fetchOriginalBookings();
                } else {
                    // Otherwise perform search
                    await dispatch(
                        searchBookings({
                            restaurantId,
                            searchTerm: input,
                            page: 1,
                            size,
                        })
                    ).unwrap();
                }
            } catch (error: any) {
                setSearchError(error.message || "Search failed");
                console.error("Search error:", error.message || "Unknown error");
            } finally {
                setIsSearching(false);
            }
        }, 500),
        [restaurantId, dispatch, size, fetchOriginalBookings]
    );



    // Trigger search when input changes
    useEffect(() => {
        debouncedSearch(searchInput);
        return () => debouncedSearch.cancel();
    }, [searchInput, debouncedSearch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };

    return {
        searchInput,
        handleInputChange,
        isSearching,
        searchError
    };
};


