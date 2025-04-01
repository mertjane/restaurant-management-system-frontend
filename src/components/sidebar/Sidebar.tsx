import "./sidebar.component.scss";
import {
  BookingIcon,
  CustomerIcon,
  DashboarIcon,
  DownArrow,
  MenuIcon,
  OrderIcon,
  ReportIcon,
  SettingIcon,
} from "../icons/Icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  PeopleCheckbox,
  StatusCheckbox,
  TimeRangePicker,
} from "../checkbox/Checkbox";
import { sidebarProps } from "./sidebarProps";
import DateRangePicker from "../dateRangePicker/DateRangePicker";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { RootState } from "../../redux/store";
import { getRestaurant } from "../../api/restaurant";

export const DashboardSidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>("dashboard");
  const dispatch = useDispatch<AppDispatch>();
  const { name, loading } = useSelector((state: RootState) => state.restaurant);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user?.id) {
      dispatch(getRestaurant(user.id));
    }
  }, [dispatch, user?.id]);

  // Load the active item from localStorage on mount
  useEffect(() => {
    const savedActiveItem = localStorage.getItem("activeSidebarItem");
    if (savedActiveItem) {
      setActiveItem(savedActiveItem);
    }
  }, []);

  // Save the active item to localStorage when it changes
  const handleItemClick = (item: string) => {
    setActiveItem(item);
    localStorage.setItem("activeSidebarItem", item);
  };

  return (
    <div className="sidebar-container">
      <header className="sidebar-header">
        {loading ? <h3>Loading...</h3> : <h3>{name || "No Restaurant"}</h3>}
      </header>
      <nav>
        <ul className="sidebar-list">
          <li>
            <DashboarIcon />
            <a href="dashboard">Dashboard</a>
          </li>
          <li>
            <OrderIcon />
            <a href="orders">Orders</a>
          </li>
          <li
            onClick={() => handleItemClick("menu")}
            className={activeItem === "menu" ? "active" : ""}
          >
            <Link to="/dashboard/menu" className="sidebar-link">
              <MenuIcon className={activeItem === "menu" ? "active" : ""} />
              <span>Menu</span>
            </Link>
          </li>
          <li
            onClick={() => handleItemClick("bookings")}
            className={activeItem === "bookings" ? "active" : ""}
          >
            <Link to="/dashboard/bookings" className="sidebar-link">
              <BookingIcon
                className={activeItem === "bookings" ? "active" : ""}
              />
              <span>Bookings</span>
            </Link>
          </li>
          <li
            onClick={() => handleItemClick("customers")}
            className={activeItem === "customers" ? "active" : ""}
          >
            <Link to="/dashboard/customers" className="sidebar-link">
              <CustomerIcon
                className={activeItem === "customers" ? "active" : ""}
              />
              <span>Customers</span>
            </Link>
          </li>
          <li>
            <ReportIcon />
            <a href="reports">Reports</a>
          </li>
          <li>
            <SettingIcon />
            <a href="settings">Settings</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export const FilterSidebar: React.FC<sidebarProps> = ({
  isSidebarOpen,
  selectedDate,
  selectedTime,
  selectedPeople,
  selectedStatus,
  onCheckboxChange,
  onStatsChange,
  onTimeRangeChange,
  onDateRangeChange,
}) => {
  const [expandFilter, setExpandFilter] = useState<string | null>(null);

  const toggleExpand = (filter: string) => {
    setExpandFilter((prev) => (prev === filter ? null : filter));
  };

  return (
    <div className={`fsidebar-container ${isSidebarOpen ? "open" : ""}`}>
      <header>
        <h4>Filter Bookings</h4>
      </header>
      <div className="fs-body">
        <ul>
          {["Date", "Time", "People", "Status"].map((filter) => (
            <li
              key={filter}
              onClick={() => toggleExpand(filter)}
              className={`filter-item ${
                expandFilter === filter ? "expanded" : ""
              }`}
            >
              <div className="filter-header">
                {filter} <DownArrow />
              </div>
              <div
                className={`filter-content ${
                  expandFilter === filter ? "show" : ""
                }`}
              >
                {filter === "Date" && (
                  <div className="date-range-wrapper">
                    <DateRangePicker
                      selectedDate={selectedDate}
                      onDateRangeChange={onDateRangeChange}
                    />
                  </div>
                )}
                {filter === "Time" && (
                  <div className="time-range-wrapper">
                    <TimeRangePicker
                      selectedTime={selectedTime}
                      onTimeRangeChange={onTimeRangeChange}
                    />
                  </div>
                )}
                {filter === "People" && (
                  <div className="people-range-wrapper">
                    <ul className="custom-checkboxes">
                      <PeopleCheckbox
                        selectedPeople={selectedPeople}
                        onCheckboxChange={onCheckboxChange}
                      />
                    </ul>
                  </div>
                )}
                {filter === "Status" && (
                  <div className="status-range-wrapper">
                    <ul className="custom-checkboxes">
                      <StatusCheckbox
                        selectedStatus={selectedStatus}
                        onStatsChange={onStatsChange}
                      />
                    </ul>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <footer>
        <button>Confirm</button>
      </footer>
    </div>
  );
};

export default {
  DashboardSidebar,
  FilterSidebar,
};
