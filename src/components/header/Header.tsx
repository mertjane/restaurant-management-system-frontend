import { useContext, useEffect, useState } from "react";
import {
  DarkTheme,
  LigthTheme,
  NotificationIcon,
  ProfileIcon,
  SidebarToggle,
} from "../icons/Icons";
import "./Header.scss";
import { NotificationDropdown, ProfileDropdown } from "../dropdown/Dropdown";

interface DashboardHeaderProps {
  openSidebar: boolean;
  toggleSidebar: () => void;
}


/** DASHBOARD HEADER */
export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  openSidebar,
  toggleSidebar,
}) => {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") || "light"
  );

  const [showProfileDropdown, setShowProfileDropdown] =
    useState<boolean>(false);
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState<boolean>(false);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));

    // Apply theme to <html> tag
    document.documentElement.setAttribute("data-theme", theme);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown-wrapper")) {
        setShowProfileDropdown(false);
        setShowNotificationDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Apply theme to <html> attribute
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <header className={`dashboard-header ${openSidebar ? "open" : "closed"}`}>
      <div onClick={toggleSidebar} className="toggle-btn">
        <SidebarToggle />
      </div>
      <div className="control-unit">
        <ul>
          <li
            className="dropdown-wrapper"
            onClick={() =>
              setShowNotificationDropdown(!showNotificationDropdown)
            }
          >
            <NotificationIcon />
          </li>
          <li onClick={toggleTheme}>
            {theme === "dark" ? <LigthTheme /> : <DarkTheme />}
          </li>
          <li
            className="dropdown-wrapper"
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          >
            <ProfileIcon />
          </li>
        </ul>
      </div>
      {showNotificationDropdown && <NotificationDropdown />}
      {showProfileDropdown && <ProfileDropdown />}
    </header>
  );
};

export const MenuHeader = () => {
  return (
    <header className="menu-header">
     <h2>Menu</h2>
    </header>
  );
};

export default {
  MenuHeader,
  DashboardHeader,
};
