import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../images/gatherlogo1.png";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar-container">
        <div className="navbar-brand">
          <img src={logo} alt="brand-logo" />
        </div>
        <div className="navbar-links">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
