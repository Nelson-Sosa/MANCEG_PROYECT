import React, { useEffect } from "react";
import "./AvatarSection.css";
import Cookies from "universal-cookie";
import { useState } from "react";

export const AvatarSection = () => {
  const [user, setUser] = useState({});
  const cookies = new Cookies();
  useEffect(() => {
    const cookies = new Cookies();
    // Get the username from the cookies
    const username = cookies.get("user");

    // Set the user state with the username
    setUser({ username });
  }, []);

  const handleLogout = () => {
    cookies.remove("token");
    cookies.remove("user");
    cookies.remove("username");
    window.location.href = "/login";
  };

  return (
    <div className="AvatarSection">
      <div>
        <h3>{user.username}</h3>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="UserOptions"></div>
    </div>
  );
};
