import React, { useEffect, useState } from "react";
import "./sidebar.component.scss";
import {
  DownChevronIcon,
  ProfileIcon,
  RightChevronIcon,
  SidebarToggleIcon,
} from "../../../lib/icons/Icons";
import { useRestaurant } from "../../../lib/hooks/useRestaurant";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState<string>("dashboard");
  const { data, isLoading, error } = useRestaurant();

  // Load the active item from localStorage on mount
  useEffect(() => {
    const savedActiveItem = localStorage.getItem("activeSidebarItem");
    if (savedActiveItem) {
      setActiveItem(savedActiveItem);
    }
  }, []);

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    localStorage.setItem("activeSidebarItem", item);
  };

  return (
    <nav className="sidebar-wrapper">
      <div className="sidebar-header">
        <SidebarToggleIcon />
        <h2>Dashboard</h2>
        <span>v1.0.2</span>
      </div>
      <div className="sidebar-body">
        <ul className="menu">
          <li className="menu-item">
            Dashboard <RightChevronIcon />
          </li>
          <Link
            className={`menu-item ${activeItem === "bookings" ? "active" : ""}`}
            onClick={() => handleItemClick("bookings")}
            to="/dashboard/bookings"
          >
            <li>
              Bookings
              <RightChevronIcon />
            </li>
          </Link>
          <Link
            className={`menu-item ${
              activeItem === "customers" ? "active" : ""
            }`}
            onClick={() => handleItemClick("customers")}
            to="/dashboard/customers"
          >
            <li>
              Customers
              <RightChevronIcon />
            </li>
          </Link>
          <li className="menu-item">
            Orders
            <RightChevronIcon />
          </li>
          <li className="menu-item">
            Menu
            <RightChevronIcon />
          </li>
          <li className="menu-item">
            Reports
            <RightChevronIcon />
          </li>
          <li className="menu-item">
            Settings
            <RightChevronIcon />
          </li>
        </ul>
      </div>
      <div className="sidebar-footer">
        <div className="content-wrapper">
          <ProfileIcon />
          <strong>{isLoading ? "Loading..." : data?.[0]?.name}</strong>
        </div>
        <DownChevronIcon />
      </div>
    </nav>
  );
};

export default Sidebar;
