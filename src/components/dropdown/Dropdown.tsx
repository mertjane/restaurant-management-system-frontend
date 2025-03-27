import React from "react";
import "./dropdown.component.scss";

export const ProfileDropdown: React.FC = () => {
  return (
    <div className="profiledown">
      <div className="arrow"></div>
      <ul>
        <li>Profile</li>
        <li>Settings</li>
        <li>Logout</li>
      </ul>
    </div>
  );
};

export const NotificationDropdown: React.FC = () => {
  return (
    <div className="notifdown">
      <div className="arrow"></div>
      <header>
        <h6>Notifications</h6>
      </header>
      <ul>
        <li>Booking request from Nina</li>
        <li>Booking request from Nina</li>
        <li>Booking request from Nina</li>
        <li>Booking request from Nina</li>
        <li>Booking request from Nina</li>
        <li>Booking request from Nina</li>
      </ul>
      <footer>
        <a>See all recent activity</a>
      </footer>
    </div>
  );
};

export default {
  ProfileDropdown,
  NotificationDropdown,
};
