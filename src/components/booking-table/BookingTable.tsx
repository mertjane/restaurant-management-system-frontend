import { useContext, useState } from "react";
import { BookingContext } from "../../context/BookingContext";
import "./booking-table.component.scss";
import {
  CancelledIcon,
  PendingIcon,
  SortIcon,
  SuccessIcon,
} from "../icons/Icons";
import { BookingModal } from "../modals/Modal";
import { getBookingById } from "../../api/bookings";
import Filter from "../filter/Filter";
import { BookingTableProps } from "./BookingTable.types";

const BookingTable:React.FC<BookingTableProps> = ({clearSelectedPeople}) => {
  const bookingContext = useContext(BookingContext);
  const [sortByTime, setSortByTime] = useState<string>("desc");
  const [sortByDate, setSortByDate] = useState<string>("desc");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [loadingBooking, setLoadingBooking] = useState<boolean>(false);
  const [errorBooking, setErrorBooking] = useState<string | null>(null);

  const openModal = async (bookingId: number) => {
    setIsModalOpen(true);
    setLoadingBooking(true);
    setErrorBooking(null);

    try {
      const bookingData = await getBookingById(bookingId);
      setSelectedBooking(bookingData);
    } catch (error) {
      setErrorBooking("Failed to fetch booking details.");
    } finally {
      setLoadingBooking(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const refreshBookings = async () => {
    if (bookingContext) {
      try {
        // Refresh bookings by fetching the current page (can adjust to other logic if necessary)
        await bookingContext.fetchBookings(1);
      } catch (error) {
        console.error("Error refreshing bookings:", error);
      }
    }
  };

  const handleSortByTime = () => {
    // Toggle sort order
    const newSortOrder = sortByTime === "asc" ? "desc" : "asc";
    setSortByTime(newSortOrder);

    if (bookingContext) {
      bookingContext.sortBookingsByTime(newSortOrder); // Sort bookings in the context
    }
  };

  const handleSortByDate = () => {
    // Toggle sort order
    const newSortOrder = sortByDate === "asc" ? "desc" : "asc";
    setSortByDate(newSortOrder);

    if (bookingContext) {
      bookingContext.sortBookingsByDate(newSortOrder); // Sort bookings in the context
    }
  };

  if (!bookingContext) {
    return <div className="booking-table">Loading...</div>;
  }

  const { bookings, loading, error } = bookingContext;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return <PendingIcon />; // You can change the color as per your design
      case "Confirmed":
        return <SuccessIcon />;
      case "Cancelled":
        return <CancelledIcon />;
      default:
        return ""; // Default color
    }
  };

  return (
    <div className="booking-table">
      <h2>Bookings</h2>
      <Filter clearSelectedPeople={clearSelectedPeople}/>
      {loading && <p>Loading bookings...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && bookings.length === 0 && <p>No bookings found.</p>}

      {!loading && !error && bookings.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>
                Date <SortIcon onClick={handleSortByDate} />
              </th>
              <th>
                Time <SortIcon onClick={handleSortByTime} />
              </th>
              <th>
                Name <SortIcon onClick={handleSortByDate} />
              </th>
              <th>
                Email <SortIcon onClick={handleSortByDate} />
              </th>
              <th>
                Phone No
                <SortIcon onClick={handleSortByDate} />
              </th>
              <th>
                People <SortIcon onClick={handleSortByDate} />
              </th>
              <th>
                Status <SortIcon onClick={handleSortByTime} />
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{new Date(booking.date).toLocaleDateString()}</td>
                <td>
                  {new Date(`1970-01-01T${booking.time}`).toLocaleTimeString(
                    [],
                    { hour: "2-digit", minute: "2-digit", hour12: false }
                  )}
                </td>
                <td>{booking.customer.name}</td>
                <td>{booking.customer.email}</td>
                <td>{booking.customer.phone}</td>
                <td>{booking.numPeople}</td>
                <td onClick={() => openModal(booking.id)}>
                  {getStatusColor(booking.status)} {booking.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isModalOpen && (
        <BookingModal
          refreshBookings={refreshBookings}
          closeModal={closeModal}
          booking={selectedBooking}
          loading={loadingBooking}
          error={errorBooking}
        />
      )}
    </div>
  );
};

export default BookingTable;
