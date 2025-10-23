import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ theme, setTheme }) => (
  <nav className="navbar">
    <h1>User Dashboard</h1>
    <div className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/add-user">Add User</Link>
      <button
        className="theme-toggle"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </div>
  </nav>
);

export default Navbar;
