import React, { useContext, useEffect } from "react";
import "./checkbox.styles.scss";
import { BookingContext } from "../../context/BookingContext";
import { checkboxProps } from "./checkbox.types";

export const PeopleCheckbox: React.FC<checkboxProps> = ({
  selectedPeople,
  onCheckboxChange
}) => {
  const bookingContext = useContext(BookingContext);

  // Handle the case where bookingContext is null
  if (!bookingContext) {
    return <p>Loading customers...</p>;
  }

  const { bookings } = bookingContext;

  // Log the updated state correctly after it changes
  useEffect(() => {
    console.log("Updated selectedPeople:", selectedPeople);
  }, [selectedPeople]); // Runs whenever selectedPeople changes
  return (
    <>
      {bookings.map((b) => (
        <li key={b.customer.name}>
          <label htmlFor={`person-${b.customer.name}`}>
            <input
              type="checkbox"
              name={`person-${b.customer.name}`}
              id={`person-${b.customer.name}`}
              checked={!!selectedPeople[b.customer.name]}
              onChange={() => onCheckboxChange(b.customer.name)}
            />
            <span className="custom-checkbox"></span>
            <span className="label-text">{b.customer.name}</span>
          </label>
        </li>
      ))}
    </>
  );
};

export const StatusCheckbox = () => {
  return (
    <>
      <li>
        <label htmlFor="pending">
          <input type="checkbox" name="pending" id="pending" />
          <span className="custom-checkbox"></span>
          <span className="label-text">Pending</span>
        </label>
      </li>
      <li>
        <label htmlFor="confirmed">
          <input type="checkbox" name="confirmed" id="confirmed" />
          <span className="custom-checkbox"></span>
          <span className="label-text">Confirmed</span>
        </label>
      </li>
      <li>
        <label htmlFor="cancelled">
          <input type="checkbox" name="cancelled" id="cancelled" />
          <span className="custom-checkbox"></span>
          <span className="label-text">Cancelled</span>
        </label>
      </li>
    </>
  );
};

export default {
  StatusCheckbox,
  PeopleCheckbox,
};
