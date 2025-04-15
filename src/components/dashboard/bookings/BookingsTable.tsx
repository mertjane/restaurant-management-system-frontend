import "./bookings.component.scss";
import BookingsAnalyze from "./bookings-analyze/BookingsAnalyze";
import BookingsSearch from "./bookings-search/BookingsSearch";
import BookingSort from "./bookings-control/BookingControl";
import { useBookingsQuery } from "../../../lib/hooks/useBookingsQuery";
import { useEffect, useState } from "react";
import Pagination from "../pagination/Pagination";
import StoredFilters from "./bookings-filter/StoredFilters";
import { IoIosAdd } from "react-icons/io";
import NewBooking from "./new-booking/NewBooking";
import { IoMdCheckmark } from "react-icons/io";

import {
  formatBookingDate,
  formatBookingTime,
} from "../../../lib/utils/bookings.utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../lib/redux/store";
import { openCreateModal } from "../../../lib/redux/slices/modalSlice";
import { Bookings } from "../../../lib/types/booking.types";
import { useBookingMutation } from "../../../lib/hooks/useBookingsMutation";

const BookingsTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isCreateOpen } = useSelector((state: RootState) => state.modal);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [editingBooking, setEditingBooking] = useState<Bookings | null>(null);
  const { mutate: updateBooking } = useBookingMutation();

  const pageSize = 10;
  const { data, isLoading, error } = useBookingsQuery(
    currentPage - 1,
    pageSize,
    searchTerm
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Debounce effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchTerm(searchInput);
      setCurrentPage(1);
    }, 500); // debounce delay
    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);

  const statusClassMap: Record<string, string> = {
    Pending: "status-pending",
    Confirmed: "status-confirmed",
    Cancelled: "status-cancelled",
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    bookingId: number,
    field: string
  ) => {
    if (editingBooking?.id !== bookingId) {
      // Start editing the booking if it's not the one currently being edited
      const bookingToEdit = data?.content.find((b) => b.id === bookingId);
      if (bookingToEdit) setEditingBooking(bookingToEdit);
    }

    const value = e.target.value;

    // Update the field based on the field type (e.g., date, time, numPeople, status)
    setEditingBooking((prev) => ({
      ...prev!,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (editingBooking) {
      // Trigger the update mutation
      updateBooking({
        id: editingBooking.id,
        updatedData: {
          date: editingBooking.date,
          time: editingBooking.time,
          num_people: editingBooking.numPeople,
          status: editingBooking.status,
        },
      });
      // Reset editing state
      setEditingBooking(null);
    }
  };

  return (
    <div className="bookings-container">
      {isCreateOpen && <NewBooking />}
      <header className="analytics-header">
        <BookingsAnalyze />
      </header>
      <div className="bookings-body">
        <div className="bookings-body-hd">
          <h2>
            All Bookings
            <IoIosAdd
              className="add-btn"
              size={35}
              title="Add Booking"
              onClick={() => dispatch(openCreateModal())}
            />
          </h2>
          <BookingsSearch searchTerm={searchInput} onSearch={setSearchInput} />
          <BookingSort />
        </div>
        <StoredFilters />
        <table className="custom-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Date</th>
              <th>Time</th>
              <th>PPL</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={4}>Loading...</td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={4}>Error fetching bookings</td>
              </tr>
            )}
            {data?.content.map((booking) => (
              <tr key={booking.id}>
                <td>{booking?.customer?.name}</td>
                <td>{booking?.customer?.phone}</td>
                <td>{booking?.customer?.email}</td>
                <td title="Edit Date">
                  <input
                    type="date"
                    value={
                      editingBooking?.id === booking.id
                        ? editingBooking.date
                        : booking.date
                    }
                    onChange={(e) => handleInputChange(e, booking.id, "date")}
                  />
                </td>
                <td title="Edit Time">
                  <input
                    type="time"
                    value={
                      editingBooking?.id === booking.id
                        ? editingBooking.time
                        : formatBookingTime(booking.time)
                    }
                    onChange={(e) => handleInputChange(e, booking.id, "time")}
                  />
                </td>
                <td title="Edit People">
                  <input
                    type="number"
                    value={
                      editingBooking?.id === booking.id
                        ? editingBooking.numPeople
                        : booking.numPeople
                    }
                    onChange={(e) =>
                      handleInputChange(e, booking.id, "numPeople")
                    }
                  />
                </td>
                <td title="Edit Status">
                  <input
                    type="text"
                    value={
                      editingBooking?.id === booking.id
                        ? editingBooking.status
                        : booking.status
                    }
                    className={
                      statusClassMap[
                        editingBooking?.status || booking.status
                      ] || ""
                    }
                    onChange={(e) => handleInputChange(e, booking.id, "status")}
                  />
                </td>
                {editingBooking?.id === booking.id && (
                  <td>
                    <button onClick={handleSave}>
                      <IoMdCheckmark className="save-icon" size={20} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="table-footer">
          <p>
            Showing data{" "}
            {data?.content.length ? (currentPage - 1) * pageSize + 1 : 0} to{" "}
            {Math.min(currentPage * pageSize, data?.totalElements || 0)} of{" "}
            {data?.totalElements || 0} entries
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={data?.totalPages || 1}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingsTable;
