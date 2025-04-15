import React, { useState } from "react";
import "./new-booking.component.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../lib/redux/store";
import { closeCreateModal } from "../../../../lib/redux/slices/modalSlice";
import { CiCalendarDate } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { useBookingMutation } from "../../../../lib/hooks/useBookingsMutation";
import { NewBookings } from "../../../../lib/types/booking.types";

const NewBooking = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isCreateOpen } = useSelector((state: RootState) => state.modal);
  const { mutate, isPending } = useBookingMutation();

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    num_people: 1,
    status: "Pending",
    customer: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (["name", "email", "phone"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        customer: {
          ...prev.customer,
          [name]: value,
        },
      }));
    } else if (["date", "time", "status"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        [name]: value, // No conversion for these fields
      }));
    } else if (name === "num_people") {
      // For num_people, convert empty string to null or 0 temporarily
      const numValue = value === "" ? 0 : Number(value);
      setFormData((prev) => ({
        ...prev,
        num_people: numValue,
      }));
    } else {
      console.warn("Unknown field in form:", name);
    }
  };

  const handleSubmit = () => {
    // Create a copy of formData with any fixes needed before submission
    const dataToSubmit = {
      ...formData,
      // Ensure num_people is at least 1
      num_people: formData.num_people === 0 ? 1 : formData.num_people,
    };
    console.log("Submitting formData:", formData);
    mutate(dataToSubmit as NewBookings, {
      onSuccess: () => {
        dispatch(closeCreateModal());
      },
    });
  };

  return (
    <div
      className={`overlay ${isCreateOpen ? "active" : ""}`}
      onClick={() => dispatch(closeCreateModal())}
    >
      <div
        className={`modal-container ${isCreateOpen ? "visible" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>
          New Booking
          <IoCloseOutline
            className="close-ico"
            size={40}
            onClick={() => dispatch(closeCreateModal())}
          />
        </h2>
        <div className="modal-body">
          <div className="row">
            <div className="control-box">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
              />
              <CiCalendarDate className="c-ico" size={20} />
            </div>
            <div className="control-box">
              <label htmlFor="time">Time</label>
              <input
                type="time"
                name="time"
                id="time"
                value={formData.time}
                onChange={handleChange}
              />
              <CiClock2 className="t-ico" size={20} />
            </div>
          </div>
          <div className="row">
            <div className="control-box">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                value={formData.customer.name}
                onChange={handleChange}
              />
            </div>
            <div className="control-box">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                autoComplete="off"
                value={formData.customer.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="control-box">
              <label htmlFor="phone">Phone</label>
              <input
                type="number"
                name="phone"
                id="phone"
                value={formData.customer.phone}
                onChange={handleChange}
              />
            </div>
            <div className="control-box">
              <label htmlFor="num_people">Number of people</label>
              <input
                type="number"
                name="num_people"
                id="num_people"
                value={formData.num_people === 0 ? "" : formData.num_people}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={handleSubmit} disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewBooking;
