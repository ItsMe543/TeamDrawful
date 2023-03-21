import React from "react";
import { Button } from "react-bootstrap";
import { useState } from "react";
import FriendsList from "./FriendsPages/FriendsList";
import FriendRequests from "./FriendsPages/FriendRequests";
import MutualFriends from "./FriendsPages/MutualFriends";
import MenuIcon from "@mui/icons-material/Menu";
import "../styles/Friends.css"

function Friends() {
  const [active, setActive] = useState("account");

  const handleSectionClick = (section) => {
    setActive(section);
  };

  const sections = [
    { id: "friends", component: <FriendsList /> },
    { id: "mutual", component: <MutualFriends /> },
    { id: "requests", component: <FriendRequests /> }
  ];

  const buttonStyle = {
    fontFamily: "Sometimes",
    fontSize: "22px",
    textTransform: "none",
    margin: "10px 0",
  };

  return( 
    <div className="profiles-container">
      <div className="bar">
        <div className="friendSidebar">
          <div className="friendSidebar-header">
            Friends
          </div>
          
          <Button style={buttonStyle} onClick={() => handleSectionClick("friends")}>
            Friends
          </Button>
          <br />
          <Button style={buttonStyle} onClick={() => handleSectionClick("mutual")}>
            Mutual Friends
          </Button>
          <br />
          <Button style={buttonStyle} onClick={() => handleSectionClick("requests")}>
            Friend requests
          </Button>
          <br />
          <Button style={buttonStyle} >
            <MenuIcon style={{ marginBottom: "5px", marginRight: "10px" }} />
            More
          </Button>
          
        </div>
      </div>

      <div className="profiles-sections">
        {sections.map((section) => (
          <div className={`section ${active === section.id.replace("-section", "") ? "active" : ""}`}>
            {section.component}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Friends;
