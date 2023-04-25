import React from "react";
import { Button } from "react-bootstrap";
import { useState } from "react";
import FriendsList from "./FriendsPages/FriendsList";
import FriendRequests from "./FriendsPages/FriendRequests";
import MutualFriends from "./FriendsPages/MutualFriends";
import MenuIcon from "@mui/icons-material/Menu";
import "../styles/Friends.css"

function Friends() {
  //Hooks in react
  //  const [varName, setName] = useState(Value);
  //To update a hook:
  //  <button onClick={() => setCount(count + 1)}>
  //    Click me
  //  </button>
  const [active, setActive] = useState("friends");

  const handleSectionClick = (section) => {
    setActive(section);
  };

  const sections = [
    { id: "friends", component: <FriendsList /> },
    { id: "mutual", component: <MutualFriends /> },
    { id: "requests", component: <FriendRequests /> }
  ];

  const buttonStyle = {
    fontFamily: "insta",
    fontSize: "22px",
    textTransform: "none",
    margin: "10px 0",
  };

  return (
    <div className="friends-container">
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

      <div className="profiles-sections">
        {sections.map((section) => (
          <div className={`section ${active === section.id.replace("-section", "") ? "active" : ""}`}>
            {section.component}
          </div>
        ))}
      </div>

      <div className="disclaimer1">
        "Alpha Project Disclaimer This server is provided by the School of Computer Science at the University of Birmingham to allow users to provide feedback on software developed by students as part of an assignment. While we take reasonable precautions, we cannot guarantee the security of the data entered into the system. Do NOT enter any real personal data (e.g., financial information or otherwise) into the system. The assignment runs until May 31st 2023, at which time the server and all associated data will be destroyed."
      </div>
    </div>


  );
}

export default Friends;
