import React from "react";
import { AiOutlineBell, AiOutlineCalendar, AiOutlineHome } from "react-icons/ai";
import { BsAward, BsPeople, BsVectorPen } from "react-icons/bs";
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
            <AiOutlineHome style={{ height: '3.5vh', width: '3.5vh' }} />
            <div style={{ fontSize: '2.8vh' }}>Home</div>
          </Link>
        </div>

        <div className="ViewDraws">
          <Link to="/viewingDrawings">
            <BsVectorPen style={{ height: '3.5vh', width: '3.5vh' }} />
            <div style={{ fontSize: '2.8vh' }}>Drawings</div>
          </Link>
        </div>

        <div className="settings">
          <Link to="/settings">
            <FiSettings style={{ height: '3.5vh', width: '3.5vh' }} />
            <div style={{ fontSize: '2.8vh' }}>Settings</div>
          </Link>
        </div>

        <div className="friends">
          <Link to="/friends">
            <BsPeople style={{ height: '3.5vh', width: '3.5vh' }} />
            <div style={{ fontSize: '2.8vh' }}>Friends</div>
          </Link>
        </div>

        <div /*className="memories"*/ style={{}}>
          <Link to="/memories">
            <AiOutlineCalendar style={{ height: '3.5vh', width: '3.5vh' }} />
            <div style={{ fontSize: '2.8vh' }}>Memories</div>
          </Link>
        </div>

        <div className="notifications">
          <Link to="/notifications">
            <AiOutlineBell style={{ height: '2.7vh', width: '2.7vh', position: 'relative', top: '30%' }} />
          </Link>
        </div>

        <div className="badges">
          <Link to="/badges">
            <BsAward style={{ height: '2.7vh', width: '2.7vh', position: 'relative', top: '30%' }} />
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Navbar;
