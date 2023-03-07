import React from "react";
import { AiOutlineBell, AiOutlineCalendar, AiOutlineHome } from "react-icons/ai";
import { BsAward, BsFillAwardFill, BsPeople, BsVectorPen } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../drawful_light.png";
import "../styles/Navbar.css";
function Navbar() {
  // Navbar component

  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="drawful logo" />
      </div>

      <div className="links">
        <div className="home">
          <Link to="/">
            <AiOutlineHome size={40} />
            <div>Home</div>
          </Link>
        </div>

        <div className="drawing">
          <Link to="/drawing">
            <BsVectorPen size={40} />
            <div>Drawing</div>
          </Link>
        </div>

        <div className="setttings">
          <Link to="/settings">
            <FiSettings size={40} />
            <div>Settings</div>
          </Link>
        </div>

        <div className="friends">
          <Link to="/friends">
            <BsPeople size={40} />
            <div>Friends</div>
          </Link>
        </div>

        <div className="memories">
          <Link to="/memories">
            <AiOutlineCalendar size={40} />
            <div>Memories</div>
          </Link>
        </div>

        <div className="notifications">
        <Link to="/notifications">
          <AiOutlineBell size={25} />
        </Link>
        </div>

        <div className="badges">
        <Link to="/badges">
          <BsAward size={25} />
        </Link>
        </div>

      </div>

      

    </div>
  );
}

export default Navbar;
