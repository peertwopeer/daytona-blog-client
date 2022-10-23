import React from "react";

import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="nav">
      <div className="nav-header">
        <NavLink to="/">
          <img
            className="company-logo"
            src="https://daytonasystems.in/wp-content/themes/daytona/images/logo/logo.svg"
          />
        </NavLink>
        <div className="nav-title">WELCOME TO BLOGS</div>
      </div>
      <NavLink className="create-button" to="/create">
        ADD NEW BLOG
      </NavLink>
    </div>
  );
}
