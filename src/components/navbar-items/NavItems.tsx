import React, { useState } from "react";
import "./nav-items.component.scss";

const NavItems = () => {
  const [menuItem, setMenuItem] = useState<string>("");

  const handleItemClick = (item: string) => {
    setMenuItem(item);
  };

  return (
    <div className="item-container">
      <ul>
        {[
          "Cold Starters",
          "Hot Starters",
          "Main Courses",
          "Soft Drinks",
          "Beers & Ciders",
          "Wines",
          "Desserts",
          "Sides",
        ].map((item) => (
          <li
            key={item}
            onClick={() => handleItemClick(item)}
            className={menuItem === item ? "active" : ""}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavItems;
