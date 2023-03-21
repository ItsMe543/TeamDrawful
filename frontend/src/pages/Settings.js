import React, { useState } from "react";
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
          <button className="buttonstyle" onClick={() => handleSectionClick("account")}>
            Account
          </button>
          <br />
          <button className="buttonstyle" onClick={() => handleSectionClick("accessibility")}>
            Accessibility
          </button>
          <br />
          <button className="buttonstyle" onClick={() => handleSectionClick("security")}>
            Privacy & Security
          </button>
          <br />
          <button className="buttonstyle" onClick={() => handleSectionClick("general")}>
            General
          </button>
          <br />
          <button className="buttonstyle" style={{ position: 'absolute', bottom: '5%', left: '10%' }}>
            <MenuIcon style={{ marginBottom: "5px", marginRight: "10px" }} />
            More
          </button>
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
