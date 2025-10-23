import React from "react";
import "./Toast.css";

const Toast = ({ message }) => (
  <div className="toast">
    <p>{message}</p>
  </div>
);

export default Toast;
