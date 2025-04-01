import { useEffect, useState } from "react";
import "./booking-table.component.scss";
import {
  CancelledIcon,
  PendingIcon,
  SortIcon,
  SuccessIcon,
} from "../icons/Icons";
import { BookingModal } from "../modals/Modal";
import { getBookings } from "../../api/bookings";
import Filter from "../filter/Filter";
import { BookingTableProps } from "./BookingTable.types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Bookings } from "../../api/types";

const BookingTable: React.FC<BookingTableProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { content, loading, error } = useSelector(
    (state: RootState) => state.bookings
  );
  const restaurantId = useSelector((state: RootState) => state.restaurant.id);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const size = 10; // Number of bookings per page

  const [selectedPeople, setSelectedPeople] = useState<{
    [key: string]: boolean;
  }>({}); // State for selectedPeople
  const [selectedStatus, setSelectedStatus] = useState<{
    [key: string]: boolean;
  }>({}); // State for selectedStatus
  const [selectedTime, setSelectedTime] = useState<{
    startTime: string;
    endTime: string;
  }>({
    startTime: "", // Default start time
    endTime: "", // Default end time
  });
  const [selectedDate, setSelectedDate] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: "",
    endDate: "",
  });

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  useEffect(() => {
    if (restaurantId) {
      dispatch(getBookings({ restaurantId, page: currentPage, size }));
    }
  }, [dispatch, restaurantId, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleCheckboxChange = (custName: string) => {
    setSelectedPeople((prev) => {
      const newSelectedPeople = {
        ...prev,
        [custName]: !prev[custName],
      };
      return newSelectedPeople;
    });
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus((prev: { [key: string]: boolean }) => {
      const newStatus = {
        ...prev,
        [status]: !prev[status],
      };
      return newStatus;
    });
  };

  const handleTimeRange = (name: string, value: string) => {
    setSelectedTime((prev: { startTime: string; endTime: string }) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateRange = (name: string, value: string) => {
    setSelectedDate((prev: { startDate: string; endDate: string }) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to clear selected people
  const clearSelectedPeople = () => setSelectedPeople({});
  const clearSelectedStatus = () => setSelectedStatus({});
  const clearSelectedTimeRange = () =>
    setSelectedTime({ startTime: "", endTime: "" });
  const clearSelectedDateRange = () =>
    setSelectedDate({ startDate: "", endDate: "" });

  // Open Modal
  const openModal = async () => {
    setIsModalOpen(true);
  };

 

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <PendingIcon />; // You can change the color as per your design
      case "Confirmed":
        return <SuccessIcon />;
      case "Cancelled":
        return <CancelledIcon />;
      default:
        return null; // Default color
    }
  };

  return (
    <div className="booking-table">
      <h2>Bookings</h2>
      <Filter
        onCheckboxChange={handleCheckboxChange}
        onStatsChange={handleStatusChange}
        onTimeRangeChange={handleTimeRange}
        onDateRangeChange={handleDateRange}
        selectedPeople={selectedPeople}
        selectedStatus={selectedStatus}
        selectedTime={selectedTime}
        selectedDate={selectedDate}
        clearSelectedStatus={clearSelectedStatus}
        clearSelectedPeople={clearSelectedPeople}
        clearSelectedDateRange={clearSelectedDateRange}
        clearSelectedTimeRange={clearSelectedTimeRange}
      />
      {loading && <p>Loading bookings...</p>}
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>
              Date <SortIcon />
            </th>
            <th>
              Time <SortIcon />
            </th>
            <th>
              Name <SortIcon />
            </th>
            <th>
              Email <SortIcon />
            </th>
            <th>
              Phone No
              <SortIcon />
            </th>
            <th>
              People <SortIcon />
            </th>
            <th>
              Status <SortIcon />
            </th>
          </tr>
        </thead>
        <tbody>
          {content.length > 0 ? (
            content.map(
              (
                booking: Bookings // Use the Bookings type
              ) => (
                <tr
                  key={booking.id}
                  onClick={() => setSelectedBooking(booking)}
                >
                  <td>{formatDate(booking.date)}</td>
                  <td>
                    {new Date(`1970-01-01T${booking.time}`).toLocaleTimeString(
                      [],
                      { hour: "2-digit", minute: "2-digit", hour12: false }
                    )}
                  </td>
                  <td>{booking.customer?.name || "N/A"}</td>
                  <td>{booking.customer?.email || "N/A"}</td>
                  <td>{booking.customer?.phone || "N/A"}</td>
                  <td>{booking.numPeople}</td>
                  <td onClick={() => openModal()}>
                    {getStatusIcon(booking.status)} {booking.status}
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan={7}>No bookings found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <BookingModal
          closeModal={() => setIsModalOpen(false)}
          booking={selectedBooking}
        />
      )}
    </div>
  );
};

export default BookingTable;
