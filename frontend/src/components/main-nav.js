import { NavLink } from "react-router-dom";
import React from "react";

const MainNav = () => (
  <div className="navbar-nav mr-auto">
    <NavLink
      to="/"
      className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
      Home
    </NavLink>
    <NavLink
      to="/profile"
      className={({ isActive }) => "nav-link" + (isActive ?  " active" : "")}>
      Profile
    </NavLink>
    {/* <NavLink
      to="/external-api"
      className={({ isActive }) => "nav-link" + (isActive ?  " active" : "")}>
      External API
    </NavLink> */}
  </div>
);

export default MainNav;