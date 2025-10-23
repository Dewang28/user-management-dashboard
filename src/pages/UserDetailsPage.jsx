import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../api";
import "./UserDetailsPage.css";

function UserDetailsPage() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getUserById(id).then((data) => setUser(data));
    }, [id]);

    if (!user)
        return <p style={{ textAlign: "center", marginTop: "60px" }}>Loading...</p>;

    return (
        <div className="details-container">
            <div className="details-card">
                
                <button className="back-btn" onClick={() => navigate(-1)}>
                    Back
                </button>

                
                <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>

                
                <h2>{user.name}</h2>

                
                <div className="details-list">
                    <p>
                        <span>Email:</span> {user.email}
                    </p>
                    <p>
                        <span>Phone:</span> {user.phone}
                    </p>
                    <p>
                        <span>Company:</span> {user.company?.name}
                    </p>
                    <p>
                        <span>Website:</span> {user.website}
                    </p>
                    <p>
                        <span>City:</span> {user.address?.city}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default UserDetailsPage;
