import React from "react";
import "./SearchBar.css";

const SearchBar = ({ value, onChange }) => (
  <input
    className="search-bar"
    type="text"
    placeholder="Search by name or email..."
    value={value}
    onChange={onChange}
  />
);

export default SearchBar;
