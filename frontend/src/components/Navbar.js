import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
function Navbar() {
  // Navbar component

  return (
    <div className="navbar">
      <div className="title">Drawful</div>

      <div className="home">
        <Link to="/">Home</Link>
      </div>

      <div className="drawing">
        <Link to="/drawing">Drawing</Link>
      </div>
      <div className="setttings">
        <Link to="/settings">Settings</Link>
      </div>
      <div className="friends">
        <Link to="/friends">Friends</Link>
      </div>
      <div className="memories">
        <Link to="/memories">Memories</Link>
      </div>
    </div>
  );
}

export default Navbar;
