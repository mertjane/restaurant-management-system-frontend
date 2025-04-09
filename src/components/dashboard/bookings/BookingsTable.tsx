import "./bookings.component.scss";
import BookingsAnalyze from "./bookings-analyze/BookingsAnalyze";
import BookingsSearch from "./bookings-search/BookingsSearch";
import BookingSort from "./bookings-sort/BookingSort";
import { useBookingsQuery } from "../../../lib/hooks/useBookingsQuery";
import { useEffect, useState } from "react";
import Pagination from "../pagination/Pagination";

const BookingsTable = () => {
  const pageSize = 10;
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
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

  return (
    <div className="bookings-container">
      <header className="analytics-header">
        <BookingsAnalyze />
      </header>
      <div className="bookings-body">
        <div className="bookings-body-hd">
          <h2>All Bookings</h2>
          <BookingsSearch searchTerm={searchInput} onSearch={setSearchInput} />
          <BookingSort />
        </div>
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
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>{booking.numPeople}</td>
                <td>{booking.status}</td>
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
