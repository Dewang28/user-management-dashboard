import React, { useEffect, useState, useRef, useCallback } from "react";
import { getUsers } from "../api";
import UserCard from "../components/UserCard";
import SearchBar from "../components/SearchBar";
import "./HomePage.css";

function HomePage({ showToast }) {
  const [users, setUsers] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const loaderRef = useRef(null);

    useEffect(() => {
        let isMounted = true; 

        getUsers()
            .then((data) => {
                if (isMounted) {
                    setUsers(data);

                    
                    if (!localStorage.getItem("toastShown")) {
                        showToast && showToast("✅ Users loaded successfully!");
                        localStorage.setItem("toastShown", "true");
                    }
                }
            })
            .catch(() => {
                showToast && showToast("❌ Failed to fetch users!");
            });

        const stored = JSON.parse(localStorage.getItem("addedUsers") || "[]");
        setAddedUsers(stored);

        return () => {
            isMounted = false;
        };
    }, [showToast]);


  const allUsers = [...users, ...addedUsers];
  const filteredUsers = allUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setVisibleCount((prev) => {
          const next = Math.min(prev + 5, filteredUsers.length);
          if (next > prev && showToast) showToast("⬇ Loading more users...");
          return next;
        });
      }
    },
    [filteredUsers.length, showToast]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "60px",
      threshold: 0.25,
    });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  const visibleUsers = filteredUsers.slice(0, visibleCount);

  return (
    <div>
      <h2>User List</h2>
      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />

      <div className="user-grid">
        {visibleUsers.map((user) => (
          <UserCard key={user.id || user.email} user={user} />
        ))}
      </div>

      {visibleCount < filteredUsers.length && (
        <div ref={loaderRef} className="infinite-loader">
          <p>Loading more users...</p>
        </div>
      )}

      {filteredUsers.length === 0 && <p>No users found.</p>}
    </div>
  );
}

export default HomePage;
