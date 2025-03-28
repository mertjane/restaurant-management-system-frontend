import React from "react";
import "./modal.component.scss";
import { BookingIcon, CloseIcon, TimeIcon } from "../icons/Icons";

interface BookingModalProps {
  closeModal: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ closeModal }) => {
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
          <div className="input-container">
            <label htmlFor="date">Date</label>
            <input type="date" name="date" id="date" className="date" />
            <span className="date-icon">
              <BookingIcon />
            </span>
          </div>
          <div className="input-container">
            <label htmlFor="time">Time</label>
            <input type="time" name="time" id="time" className="time" />
            <span className="date-icon">
              <TimeIcon />
            </span>
          </div>
          <div className="input-container">
            <label htmlFor="people">People</label>
            <input type="number" name="people" id="people" className="people" />
          </div>
          <div className="status-container">
            <ul>
              <li>Pending</li>
              <li>Confirmed</li>
              <li>Cancelled</li>
            </ul>
          </div>
        </div>
        <footer className="modal-footer">
          <button>Confirm</button>
        </footer>
      </div>
    </div>
  );
};

export default {
  BookingModal,
};
