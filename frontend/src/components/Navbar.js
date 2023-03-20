import React from "react";
import {
  AiOutlineBell,
  AiOutlineCalendar,
  AiOutlineHome,
} from "react-icons/ai";
import { BsAward, BsPeople, BsVectorPen } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../drawful_light.png";
import "../styles/Navbar.css";
function Navbar() {
  // Navbar component

  return (
    <div className="Navbar">
      <div className="logo">
        <img src={logo} alt="drawful logo" />
      </div>
      <div className="links">
        <div className="home">
          <Link to="/">
            <AiOutlineHome size={30} />
            <div>Home</div>
          </Link>
        </div>

        <div className="ViewDraws">
          <Link to="/viewingDrawings">
            <BsVectorPen size={30} />
            <div>Drawings</div>
          </Link>
        </div>

        <div className="settings">
          <Link to="/settings">
            <FiSettings size={30} />
            <div>Settings</div>
          </Link>
        </div>

        <div className="friends">
          <Link to="/friends">
            <BsPeople size={30} />
            <div>Friends</div>
          </Link>
        </div>

        <div className="memories" style={{}}>
          <Link to="/memories">
            <AiOutlineCalendar size={30} />
            <div>Memories</div>
          </Link>
        </div>

        {/* <div className="notifications">
          <Link to="/notifications">
            <AiOutlineBell
              style={
                {
                  // height: "2.7vh",
                  // width: "2.7vh",
                  // position: "relative",
                  // top: "30%",
                }
              }
              size={30}
            />
            <div>Notifications</div>
          </Link>
        </div> */}

        {/* <div className="badges">
          <Link to="/badges">
            <BsAward
              // style={{
              //   height: "2.7vh",
              //   width: "2.7vh",
              //   position: "relative",
              //   top: "30%",
              // }}
              size={30}
            />
            <div>Badges</div>
          </Link>
        </div> */}
      </div>
    </div>
  );
}

export default Navbar;
