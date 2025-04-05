import { useEffect, useState } from "react";
import "./booking-table.component.scss";
import {
  CancelledIcon,
  PendingIcon,
  SortIcon,
  SuccessIcon,
} from "../icons/Icons";
import { BookingModal, NewBookingModal } from "../modals/Modal";

import Filter from "../filter/Filter";
import { BookingTableProps } from "./BookingTable.types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Bookings } from "../../api/types";
import Pagination from "../pagination/Pagination";
import { useBookingFilters } from "../../hooks/useBookingFilters";
import { Spinner } from "../loader/loader.component";
import useSortBookings from "../../hooks/useSortBookings";
import { formatDate } from "../../lib/utils/booking.utils";

const BookingTable: React.FC<BookingTableProps> = () => {
  const { content, loading, error, totalPages } = useSelector(
    (state: RootState) => state.bookings
  );
  const restaurantId = useSelector((state: RootState) => state.restaurant.id);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isNewBookingOpen, setIsNewBookingOpen] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  // State to track current sort direction for each column
  const [sortConfig, setSortConfig] = useState<{
    column: string;
    direction: "asc" | "desc";
  }>({ column: "", direction: "asc" });

  const size = 10;

  // Use the custom hook
  const {
    filters,
    applyFilters,
    initialLoadComplete,
    handlePeopleChange,
    handleStatusChange,
    handleTimeRangeChange,
    handleDateRangeChange,
    clearSelectedPeople,
    clearSelectedStatus,
    clearSelectedTimeRange,
    clearSelectedDateRange,
  } = useBookingFilters({ restaurantId, size });

  const {
    sortByTimeAscending,
    sortByTimeDescending,
    sortByDateAscending,
    sortByDateDescending,
  } = useSortBookings();

  const handleSort = (column: string) => {
    let direction: "asc" | "desc" = "asc";

    // If clicking the same column, toggle direction
    if (sortConfig.column === column) {
      direction = sortConfig.direction === "asc" ? "desc" : "asc";
    }

    setSortConfig({ column, direction });

    switch (column) {
      case "date":
        if (direction === "asc") {
          sortByDateAscending(restaurantId!, currentPage, size);
        } else {
          sortByDateDescending(restaurantId!, currentPage, size);
        }
        break;
      case "time":
        if (direction === "asc") {
          sortByTimeAscending(restaurantId!, currentPage, size);
        } else {
          sortByTimeDescending(restaurantId!, currentPage, size);
        }
        break;
      // Add cases for other sortable columns if needed
      default:
        break;
    }
  };

  // This is the ONLY useEffect for data fetching
  useEffect(() => {
    if (restaurantId) {
      applyFilters(currentPage);
    }
  }, [restaurantId, currentPage, applyFilters]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Open Modal
  const openModal = async () => {
    setIsModalOpen(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <PendingIcon />; // You can change the color as per your design
      case "Confirmed":
        return <SuccessIcon />;
      case "Cancelled":
        return <CancelledIcon />;
      default:
        return null; // Default color
    }
  };

  return (
    <div className="booking-table">
      <div className="navigation">
        <h2>Bookings</h2>
      </div>
      <Filter
        onCheckboxChange={handlePeopleChange}
        onStatsChange={handleStatusChange}
        onTimeRangeChange={handleTimeRangeChange}
        onDateRangeChange={handleDateRangeChange}
        selectedPeople={filters.selectedPeople}
        selectedStatus={filters.selectedStatus}
        selectedTime={filters.selectedTime}
        selectedDate={filters.selectedDate}
        clearSelectedStatus={clearSelectedStatus}
        clearSelectedPeople={clearSelectedPeople}
        clearSelectedDateRange={clearSelectedDateRange}
        clearSelectedTimeRange={clearSelectedTimeRange}
        onNewBookingClick={() => setIsNewBookingOpen(true)}
      />
      {/* Loading state - replaces entire table during load */}
      {loading && !initialLoadComplete ? (
        <div className="loading-overlay">
          <Spinner />
        </div>
      ) : (
        <>
          {error && <p className="error">{error}</p>}
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort("date")}>
                  Date
                  <SortIcon />
                </th>
                <th onClick={() => handleSort("time")}>
                  Time
                  <SortIcon />
                </th>
                <th>
                  Name <SortIcon />
                </th>
                <th>
                  Email <SortIcon />
                </th>
                <th>
                  Phone No <SortIcon />
                </th>
                <th>
                  People <SortIcon />
                </th>
                <th>
                  Status <SortIcon />
                </th>
              </tr>
            </thead>
            <tbody>
              {content.length > 0 ? (
                content.map(
                  (
                    booking: Bookings // Use the Bookings type
                  ) => (
                    <tr
                      key={booking.id}
                      onClick={() => (setSelectedBooking(booking), openModal())}
                    >
                      <td>{formatDate(booking.date)}</td>
                      <td>
                        {new Date(
                          `1970-01-01T${booking.time}`
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                      </td>
                      <td>{booking.customer?.name || "N/A"}</td>
                      <td>{booking.customer?.email || "N/A"}</td>
                      <td>{booking.customer?.phone || "N/A"}</td>
                      <td>{booking.numPeople}</td>
                      <td>
                        {getStatusIcon(booking.status)} {booking.status}
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan={7}>No bookings found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
      {isModalOpen && (
        <BookingModal
          closeModal={() => setIsModalOpen(false)}
          booking={selectedBooking}
        />
      )}
      {isNewBookingOpen && (
        <NewBookingModal closeModal={() => setIsNewBookingOpen(false)} />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default BookingTable;
