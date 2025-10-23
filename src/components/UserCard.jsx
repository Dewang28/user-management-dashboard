import React from "react";
import { Link } from "react-router-dom";
import "./UserCard.css";

const UserCard = ({ user }) => (
  <div className="user-card">
    <h3>{user.name}</h3>
    <p>Email: {user.email}</p>
    <p>Phone: {user.phone}</p>
    <p>Company: {user.company?.name || user.company}</p>
    {user.id && <Link to={`/user/${user.id}`}>View Details</Link>}
  </div>
);

export default UserCard;
