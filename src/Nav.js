import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li>
          <NavLink exact to="/search/bus">
            Bus
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/search/car">
            Car
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/search/train">
            Train
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
