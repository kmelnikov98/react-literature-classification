import React from "react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const AuthNav = () => (
  <div className="navbar-nav ml-auto">
    <LoginButton/>
    <LogoutButton/>
  </div>
);

export default AuthNav;