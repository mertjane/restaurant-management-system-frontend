import React from "react";
import "./menu.component.scss";
import { MenuHeader } from "../../components/header/Header";
import NavItems from "../../components/navbar-items/NavItems";

const MenuComponent = () => {
  return (
    <div className="menu-container">
      <MenuHeader />
      <nav>
        <NavItems />
      </nav>
      <main>
        <article></article>
      </main>
    </div>
  );
};

export default MenuComponent;
