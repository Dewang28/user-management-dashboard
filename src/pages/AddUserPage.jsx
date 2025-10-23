import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddUserPage({ showToast }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.company) {
      setError("All fields are required!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("addedUsers") || "[]");
    users.push(form);
    localStorage.setItem("addedUsers", JSON.stringify(users));

    showToast("✅ User added successfully!");
    navigate("/");
  };

  return (
    <div>
      <h2>Add New User</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form className="add-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default AddUserPage;
