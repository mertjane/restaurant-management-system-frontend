import React, { useContext, useEffect } from "react";
import { BookingContext } from "../../context/BookingContext";
import "./booking-table.component.scss";
import { SortIcon } from "../icons/Icons";

const BookingTable = () => {
  const bookingContext = useContext(BookingContext);

  useEffect(() => {
    if (bookingContext) {
      bookingContext.fetchBookings(1); // Fetch bookings on mount
    }
  }, []);

  if (!bookingContext) {
    return <div className="booking-table">Loading...</div>;
  }

  const { bookings, loading, error } = bookingContext;

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
              <th>Booking ID</th>
              <th>
                Date <SortIcon />{" "}
              </th>
              <th>
                Time <SortIcon />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>People</th>
              <th>
                Status <SortIcon />
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{new Date(booking.date).toLocaleDateString()}</td>
                <td>
                  {new Date(`1970-01-01T${booking.time}Z`).toLocaleTimeString(
                    [],
                    { hour: "2-digit", minute: "2-digit", hour12: false }
                  )}
                </td>
                <td>{booking.customer.name}</td>
                <td>{booking.customer.email}</td>
                <td>{booking.numPeople}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookingTable;
