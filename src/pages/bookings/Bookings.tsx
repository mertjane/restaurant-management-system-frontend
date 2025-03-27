import React from "react";
import "./bookings.component.scss";
import BookingTable from "../../components/booking-table/BookingTable";

const Bookings = () => {
  return (
    <div className="booking-container">
      <BookingTable />
    </div>
  );
};

export default Bookings;
