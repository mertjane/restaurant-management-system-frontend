import "./sidebar.component.scss";
import {
  BookingIcon,
  CustomerIcon,
  DashboarIcon,
  MenuIcon,
  OrderIcon,
  ReportIcon,
  SettingIcon,
} from "../icons/Icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { RestaurantContext } from "../../context/RestaurantContext";

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>("dashboard");
  const { restaurants } = useContext(RestaurantContext);

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
        <h3>{restaurants?.[0]?.name}</h3>
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
          <li>
            <MenuIcon />
            <a href="menu">Menu</a>
          </li>
          <li
            onClick={() => handleItemClick("bookings")}
            className={activeItem === "bookings" ? "active" : ""}
          >
            <Link to="/dashboard/bookings" className="sidebar-link">
              <BookingIcon />
              <span>Bookings</span>
            </Link>
          </li>
          <li
            onClick={() => handleItemClick("customers")}
            className={activeItem === "customers" ? "active" : ""}
          >
            <Link to="/dashboard/customers" className="sidebar-link">
              <CustomerIcon />
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

export default Sidebar;
