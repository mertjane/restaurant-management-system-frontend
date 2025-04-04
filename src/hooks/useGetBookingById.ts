import { AppDispatch, RootState } from "../redux/store";
import { getBookingById } from "../api/bookings";
import { useDispatch, useSelector } from "react-redux";


const useGetBookingById = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.bookings);

    const fetchBookingById = async (id: number) => {
      try {
        const result = await dispatch(getBookingById({ id })).unwrap();
        return result;
      } catch (error) {
        console.error("Failed to fetch booking:", error);
        throw error;
      }
    };

    return {
      fetchBookingById,
      loading,
      error,
    };
  };

  export default useGetBookingById;
