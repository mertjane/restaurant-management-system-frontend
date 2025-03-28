import { useContext, useState } from "react";
import { BookingContext } from "../../context/BookingContext";
import "./booking-table.component.scss";
import {
  CancelledIcon,
  EditIcon,
  PendingIcon,
  SortIcon,
  SuccessIcon,
} from "../icons/Icons";
import { BookingModal } from "../modals/Modal";

const BookingTable = () => {
  const bookingContext = useContext(BookingContext);
  const [sortByTime, setSortByTime] = useState<string>("desc");
  const [sortByDate, setSortByDate] = useState<string>("desc");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
      case "pending":
        return <PendingIcon />; // You can change the color as per your design
      case "confirmed":
        return <SuccessIcon />;
      case "cancelled":
        return <CancelledIcon />;
      default:
        return "black"; // Default color
    }
  };

  return (
    <div className="booking-table">
      <h2>Bookings</h2>
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
                <td onClick={openModal}>
                  {getStatusColor(booking.status)} {booking.status} <EditIcon />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isModalOpen && <BookingModal closeModal={closeModal} />}
    </div>
  );
};

export default BookingTable;
