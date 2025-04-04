import { useDispatch } from "react-redux";
import { sortByTimeASC, sortByTimeDESC, sortByDateASC, sortByDateDESC } from "../api/sort-bookings";
import { AppDispatch } from "../redux/store";

const useSortBookings = () => {
    const dispatch = useDispatch<AppDispatch>();

    const sortByTimeAscending = (restaurantId: number, page: number, size: number) => {
        return dispatch(sortByTimeASC({ restaurantId, page, size }));
    };

    const sortByTimeDescending = (restaurantId: number, page: number, size: number) => {
        return dispatch(sortByTimeDESC({ restaurantId, page, size }));
    };

    const sortByDateAscending = (restaurantId: number, page: number, size: number) => {
        return dispatch(sortByDateASC({ restaurantId, page, size }));
    };

    const sortByDateDescending = (restaurantId: number, page: number, size: number) => {
        return dispatch(sortByDateDESC({ restaurantId, page, size }));
    };

    return {
        sortByTimeAscending,
        sortByTimeDescending,
        sortByDateAscending,
        sortByDateDescending,
    };
};

export default useSortBookings;
