import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">

      <h2 className="logo">⚡ LeadFlow</h2>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/leads">Leads</Link>
        <Link to="/">Logout</Link>
      </div>

    </div>
  );
};

export default Navbar;