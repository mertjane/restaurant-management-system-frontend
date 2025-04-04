// hooks/useBookingFilters.ts
import { useState, useCallback, useEffect } from "react";
import { AppDispatch } from "../redux/store";
import { filterBookings, getBookings } from "../api/bookings";
import { useDispatch } from "react-redux";

interface FilterState {
    selectedPeople: { [key: string]: boolean };
    selectedStatus: { [key: string]: boolean };
    selectedTime: { startTime: string; endTime: string };
    selectedDate: { startDate: string; endDate: string };
}

interface UseBookingFiltersProps {
    restaurantId: number | null;
    size: number;
}

export const useBookingFilters = ({ restaurantId, size }: UseBookingFiltersProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [initialLoadComplete, setInitialLoadComplete] = useState<boolean>(false);


    // State for all filters
    const [filters, setFilters] = useState<FilterState>({
        selectedPeople: {},
        selectedStatus: {},
        selectedTime: { startTime: "", endTime: "" },
        selectedDate: { startDate: "", endDate: "" },
    });

    // Apply filters to the API
    const applyFilters = useCallback(async (page: number = 1) => {
        if (!restaurantId) return;

        // Check if any filters are active
        const hasActiveFilters = Boolean(
            Object.values(filters.selectedStatus).some(Boolean) ||
            filters.selectedTime.startTime ||
            filters.selectedTime.endTime ||
            filters.selectedDate.startDate ||
            filters.selectedDate.endDate ||
            Object.values(filters.selectedPeople).some(Boolean)
        );

        try {
            if (!hasActiveFilters) {
                await dispatch(getBookings({ restaurantId, page, size })).unwrap();
            } else {
                const selectedPeopleNames = Object.entries(filters.selectedPeople)
                    .filter(([_, isSelected]) => isSelected)
                    .map(([name]) => name);

                const status = Object.entries(filters.selectedStatus)
                    .find(([_, isSelected]) => isSelected)?.[0];

                await dispatch(filterBookings({
                    restaurantId,
                    status,
                    startTime: filters.selectedTime.startTime,
                    endTime: filters.selectedTime.endTime,
                    startDate: filters.selectedDate.startDate,
                    endDate: filters.selectedDate.endDate,
                    customerNames: selectedPeopleNames.length > 0 ? selectedPeopleNames : undefined,
                    page,
                    size
                })).unwrap();
            }
        } catch (error) {
            console.error("Filter error:", error);
        }
    }, [restaurantId, filters, dispatch, size]);

    // Initial load
    useEffect(() => {
        if (restaurantId && !initialLoadComplete) {
            applyFilters(1).finally(() => setInitialLoadComplete(true));
        }
    }, [restaurantId, applyFilters, initialLoadComplete]);

    // Handle subsequent filter/page changes
    useEffect(() => {
        if (initialLoadComplete) {
            applyFilters(1); // Always reset to page 1 when filters change
        }
    }, [filters, initialLoadComplete, applyFilters]);


    // Handler functions
    const handlePeopleChange = useCallback((name: string) => {
        setFilters(prev => ({
            ...prev,
            selectedPeople: {
                ...prev.selectedPeople,
                [name]: !prev.selectedPeople[name]
            }
        }));
    }, []);

    const handleStatusChange = useCallback((status: string) => {
        setFilters(prev => ({
            ...prev,
            selectedStatus: {
                // For single selection, clear other statuses
                ...Object.keys(prev.selectedStatus).reduce((acc, key) => {
                    acc[key] = false;
                    return acc;
                }, {} as { [key: string]: boolean }),
                [status]: !prev.selectedStatus[status]
            }
        }));
    }, []);

    const handleTimeRangeChange = useCallback((name: string, value: string) => {
        setFilters(prev => ({
            ...prev,
            selectedTime: {
                ...prev.selectedTime,
                [name]: value
            }
        }));
    }, []);

    const handleDateRangeChange = useCallback((name: string, value: string) => {
        setFilters(prev => ({
            ...prev,
            selectedDate: {
                ...prev.selectedDate,
                [name]: value
            }
        }));
    }, []);

    // Clear functions
    const clearSelectedPeople = useCallback(() => {
        setFilters(prev => ({ ...prev, selectedPeople: {} }));
    }, []);

    const clearSelectedStatus = useCallback(() => {
        setFilters(prev => ({ ...prev, selectedStatus: {} }));
    }, []);

    const clearSelectedTimeRange = useCallback(() => {
        setFilters(prev => ({ ...prev, selectedTime: { startTime: "", endTime: "" } }));
    }, []);

    const clearSelectedDateRange = useCallback(() => {
        setFilters(prev => ({ ...prev, selectedDate: { startDate: "", endDate: "" } }));
    }, []);

    return {
        filters,
        applyFilters,
        initialLoadComplete,
        handlePeopleChange,
        handleStatusChange,
        handleTimeRangeChange,
        handleDateRangeChange,
        clearSelectedPeople,
        clearSelectedStatus,
        clearSelectedTimeRange,
        clearSelectedDateRange
    };
};