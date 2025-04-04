import "./modal.component.scss";
import { BookingIcon, CloseIcon, TimeIcon } from "../icons/Icons";
import { Bookings } from "../../api/types";
import { useUpdateBooking } from "../../hooks/useUpdateBooking";

interface BookingModalProps {
    closeModal: () => void;
    booking: Bookings | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
    closeModal,
    booking,
}) => {
    const {
        formData,
        loading,
        error,
        handleStatusChange,
        handleInputChange,
        handleSubmit,
    } = useUpdateBooking(booking);

    const onSave = async () => {
        if (booking) {
            await handleSubmit(booking.id, closeModal);
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
                    {error ? (
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
                                        value={formData.date} // Controlled value
                                        onChange={handleInputChange}
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
                                        onChange={handleInputChange}
                                    />
                                    <span className="date-icon">
                                        <TimeIcon />
                                    </span>
                                </div>
                                <div className="input-container">
                                    <label htmlFor="people">People</label>
                                    <input
                                        type="number"
                                        name="num_people"
                                        id="people"
                                        className="people"
                                        value={
                                            formData.num_people === 0
                                                ? ""
                                                : formData.num_people
                                        }
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="status-container">
                                    <ul>
                                        {[
                                            "Pending",
                                            "Confirmed",
                                            "Cancelled",
                                        ].map((status) => (
                                            <li
                                                key={status}
                                                className={
                                                    formData.status === status
                                                        ? "active"
                                                        : ""
                                                }
                                                onClick={() =>
                                                    handleStatusChange(status)
                                                }
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
                    <button onClick={onSave} disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </button>
                </footer>
            </div>
        </div>
    );
};

/** New Booking Modal */
export const NewBookingModal = () => {
    return (
        <div className={`modal-overlay show`}>
            <div className="modal-container show"></div>
        </div>
    );
};

export default {
    BookingModal,
};
