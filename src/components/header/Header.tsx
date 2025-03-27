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


export const AuthHeader = () => {
  return (
    <header className="auth-header">
      <h3>System Management</h3>
    </header>
  );
};

export const DashboardHeader:React.FC<DashboardHeaderProps> = ({openSidebar, toggleSidebar}) => {
  const [changeTheme, setChangeTheme] = useState<string>("light");
  const [showProfileDropdown, setShowProfileDropdown] =
    useState<boolean>(false);
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState<boolean>(false);

  const toggleTheme = () => {
    setChangeTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
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

  return (
    <header  className={`dashboard-header ${openSidebar ? "open" : "closed"}`}>
      <div
        onClick={toggleSidebar}
        className="toggle-btn"
      >
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
            {changeTheme === "dark" ? <LigthTheme /> : <DarkTheme />}
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

export default {
  AuthHeader,
  DashboardHeader,
};
