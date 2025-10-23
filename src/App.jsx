import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserDetailsPage from "./pages/UserDetailsPage";
import AddUserPage from "./pages/AddUserPage";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import "./App.css";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [toast, setToast] = useState("");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  return (
    <Router>
      <Navbar theme={theme} setTheme={setTheme} />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage showToast={showToast} />} />
          <Route path="/user/:id" element={<UserDetailsPage />} />
          <Route
            path="/add-user"
            element={<AddUserPage showToast={showToast} />}
          />
        </Routes>
      </div>
      {toast && <Toast message={toast} />}
    </Router>
  );
}

export default App;
