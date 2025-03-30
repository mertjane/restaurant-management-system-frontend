import React, { useEffect, useState } from "react";
import "./modal.component.scss";
import { BookingIcon, CloseIcon, TimeIcon } from "../icons/Icons";
import { updateBookingById } from "../../api/bookings";

interface BookingModalProps {
  closeModal: () => void;
  booking: any;
  loading: boolean;
  error: string | null;
  refreshBookings: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  closeModal,
  booking,
  loading,
  error,
  refreshBookings,
}) => {
  const [formData, setFormData] = useState({
    date: booking?.date || "",
    time: booking?.time || "",
    num_people: booking?.numPeople || 0,
    status: booking?.status || "",
  });

  useEffect(() => {
    if (booking) {
      // Update the formData when the booking prop changes
      setFormData({
        time: booking.time,
        date: booking.date,
        num_people: booking.numPeople,
        status: booking.status,
      });
    }
  }, [booking]); // Re-run when `booking` changes

  if (!booking) return null;

  const handleStatusChange = (status: string) => {
    setFormData((prev) => ({
      ...prev,
      status,
    }));
  };

  const handleSubmit = async () => {
    try {
      await updateBookingById(booking.id, formData);
      refreshBookings(); // Refresh booking list after update
      closeModal();
    } catch (err) {
      console.error("Error updating booking:", err);
    }
  };

  return (
    <div className={`modal-overlay show`} onClick={closeModal}>
      <div
        className="modal-container show"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-header">
          <h4>Manage Booking</h4>
          <button onClick={closeModal}>
            <CloseIcon />
          </button>
        </header>
        <div className="modal-body">
          {loading ? (
            <p>Loading booking details...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            booking && (
              <>
                <div className="input-container">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    className="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />
                  <span className="date-icon">
                    <BookingIcon />
                  </span>
                </div>
                <div className="input-container">
                  <label htmlFor="time">Time</label>
                  <input
                    type="time"
                    name="time"
                    id="time"
                    value={formData.time} // Controlled value
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    } // Update on change
                  />
                  <span className="date-icon">
                    <TimeIcon />
                  </span>
                </div>
                <div className="input-container">
                  <label htmlFor="people">People</label>
                  <input
                    type="number"
                    name="people"
                    id="people"
                    className="people"
                    value={formData.num_people}
                    onChange={
                      (e) =>
                        setFormData({
                          ...formData,
                          num_people: parseInt(e.target.value),
                        }) // ensure it's a number
                    }
                  />
                </div>
                <div className="status-container">
                  <ul>
                    {["Pending", "Confirmed", "Cancelled"].map((status) => (
                      <li
                        key={status}
                        className={formData.status === status ? "active" : ""}
                        onClick={() => handleStatusChange(status)}
                      >
                        {status}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )
          )}
        </div>
        <footer className="modal-footer">
          <button onClick={handleSubmit}>Save</button>
        </footer>
      </div>
    </div>
  );
};



/** New Booking Modal */
export const NewBookingModal = () => {
  return (
    <div className={`modal-overlay show`}>
      <div className="modal-container show">

      </div>
    </div>
  )
}

export default {
  BookingModal,
};
