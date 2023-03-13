import React, { useState } from "react";
import { Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import GeneralSettings from "../pages/Settings/GeneralSettings";
import Account from "../pages/Settings/Account";
import Security from "../pages/Settings/Security";
import Accessibility from "../pages/Settings/Accessibility";
import "../styles/Settings.css";

export default function Settings() {
  const [active, setActive] = useState("account");

  const handleSectionClick = (section) => {
    setActive(section);
  };

  const buttonStyle = {
    fontFamily: "Sometimes",
    fontSize: "22px",
    textTransform: "none",
    margin: "10px 0",
  };

  const sections = [
    { id: "general", component: <GeneralSettings /> },
    { id: "security", component: <Security /> },
    { id: "account", component: <Account /> },
    { id: "accessibility", component: <Accessibility /> }
  ];

  return (
    <div className="settings-container">
      <div className="menu">
        <div className="menu-header">
          Settings
        </div>
        <div className="search-bar">
          <input type="text" placeholder="   Search" />
        </div>
        <div>
          <Button style={buttonStyle} onClick={() => handleSectionClick("account")}>
            Account
          </Button>
          <br />
          <Button style={buttonStyle} onClick={() => handleSectionClick("accessibility")}>
            Accessibility
          </Button>
          <br />
          <Button style={buttonStyle} onClick={() => handleSectionClick("security")}>
            Privacy & Security
          </Button>
          <br />
          <Button style={buttonStyle} onClick={() => handleSectionClick("general")}>
            General
          </Button>
          <br />
          <Button className="more-button" style={buttonStyle}>
            <MenuIcon style={{ marginBottom: "5px", marginRight: "10px" }} />
            More
          </Button>
        </div>
      </div>
      <div className="settings-sections">
        {sections.map((section) => (
          <div className={`section ${active === section.id.replace("-section", "") ? "active" : ""}`}>
            {section.component}
          </div>
        ))}
      </div>
    </div>
  );
}
