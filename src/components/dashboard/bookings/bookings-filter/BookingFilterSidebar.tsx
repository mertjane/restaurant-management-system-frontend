import "./filter.component.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../lib/redux/store";
import { closeFilter } from "../../../../lib/redux/slices/filterSlice";
import { DownChevronIcon } from "../../../../lib/icons/Icons";
import { useState } from "react";
import DateRange from "./DateRange";
import TimeRange from "./TimeRange";
import SelectStatus from "./SelectStatus";
import SortSelection from "./SortSelection";

const BookingFilterSidebar = () => {
  const [toggleSelect, setToggleSelect] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useSelector((state: RootState) => state.filter.isOpen);

  const handleToggle = (key: string) => {
    setToggleSelect((prev) => (prev === key ? "" : key)); // toggle open/close
  };

  const handleClose = () => {
    dispatch(closeFilter());
  };

  return (
    <div className={`overlay ${isOpen ? "active" : ""}`} onClick={handleClose}>
      <div
        className={`filter-sidebar ${isOpen ? "active" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="filter-header">
          <h2>Filter & Sort Bookings</h2>
        </header>

        <div className="filter-body">
          {/* Filter by date */}
          <div
            className={`control-box ${toggleSelect === "date" ? "active" : ""}`}
          >
            <label onClick={() => handleToggle("date")}>
              Filter by date <DownChevronIcon />
            </label>
            {toggleSelect === "date" && <DateRange />}
          </div>
          {/* Filter by time */}
          <div
            className={`control-box ${toggleSelect === "time" ? "active" : ""}`}
          >
            <label onClick={() => handleToggle("time")}>
              Filter by time <DownChevronIcon />
            </label>
            {toggleSelect === "time" && <TimeRange />}
          </div>
          {/* Filter by status */}
          <div
            className={`control-box ${
              toggleSelect === "status" ? "active" : ""
            }`}
          >
            <label onClick={() => handleToggle("status")}>
              Filter by status <DownChevronIcon />
            </label>
            {toggleSelect === "status" && <SelectStatus />}
          </div>
          {/* Sortby */}
          <div className="control-box">
            <label onClick={() => handleToggle("sortby")}>
              Sortby <DownChevronIcon />
            </label>
            {toggleSelect === "sortby" && <SortSelection />}
          </div>
        </div>
        <div className="filter-footer">
          <button className="submitControl">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default BookingFilterSidebar;
