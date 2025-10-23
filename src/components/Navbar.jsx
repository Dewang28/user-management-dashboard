import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ theme, setTheme }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <h1 className="logo">User Dashboard</h1>

            {/* Hamburger menu (visible on small screens) */}
            <button
                className="menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
            >
                ☰
            </button>

            <div className={`nav-links ${menuOpen ? "open" : ""}`}>
                <Link to="/" onClick={() => setMenuOpen(false)}>
                    Home
                </Link>
                <Link to="/add-user" onClick={() => setMenuOpen(false)}>
                    Add User
                </Link>
                <button
                    className="theme-toggle"
                    onClick={() => {
                        setTheme(theme === "light" ? "dark" : "light");
                        setMenuOpen(false);
                    }}
                >
                    {theme === "light" ? "🌙" : "☀️"}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
