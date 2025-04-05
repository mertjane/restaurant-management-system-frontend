import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { getCustomers, searchCustomers } from '../api/customers';
import debounce from 'lodash/debounce';


interface UseCustomerReturn {
     searchInput: string;
     handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
     handlePageChange: (page: number) => void;
     isSearching?: boolean;
     searchError?: string | null;
     currentPage: number;
};

export const useCustomer = (): UseCustomerReturn => {
     const dispatch = useDispatch<AppDispatch>();
     const restaurantId = useSelector((state: RootState) => state.restaurant.id);
     const id = useSelector((state: RootState) => state.auth.user?.id ?? 0);
     const [currentPage, setCurrentPage] = useState<number>(1);
     const [searchInput, setSearchInput] = useState<string>("");
     const [isSearching, setIsSearching] = useState<boolean>(false);
     const [searchError, setSearchError] = useState<string | null>(null);
     const size = 10;


     // Get default customers function
     const fetchCustomers = useCallback(() => {
          if (restaurantId) {
               dispatch(getCustomers({ userId: id, page: currentPage, size }))
                    .unwrap()
                    .catch((error: { message?: string }) => {
                         console.error("Failsed to fetch customers:", error.message || "Unknown error");
                    });
          }
     }, [id, dispatch, restaurantId, size, currentPage]);

/*      useEffect(() => {
          fetchCustomers();
     }, [fetchCustomers, currentPage]); */


     // Debounced search function
     const debouncedSearch = useCallback(
          debounce(async (input: string) => {
               if (!restaurantId) return;
               try {
                    setIsSearching(true);
                    setSearchError(null);

                    if (input.trim() === "") {
                         // If search is empty, fetch original customers
                         await fetchCustomers();
                    } else {
                         // Otherwise perform search
                         await dispatch(
                              searchCustomers({
                                   restaurantId,
                                   searchTerm: input,
                                   page: currentPage,
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
          [restaurantId, dispatch, size, fetchCustomers])


     // Trigger search when input changes
     useEffect(() => {
          debouncedSearch(searchInput);
          return () => debouncedSearch.cancel();
     }, [searchInput, debouncedSearch]);

     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchInput(e.target.value);
     };

     const handlePageChange = (page: number) => {
          setCurrentPage(page);
          dispatch(getCustomers({ userId: id, page, size }));
     };


     return {
          searchInput,
          handleInputChange,
          handlePageChange,
          isSearching,
          searchError,
          currentPage
     };
};
