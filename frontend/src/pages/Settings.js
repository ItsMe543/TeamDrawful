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
      <div className="disclaimer2">
          "Alpha Project Disclaimer This server is provided by the School of Computer Science at the University of Birmingham to allow users to provide feedback on software developed by students as part of an assignment. While we take reasonable precautions, we cannot guarantee the security of the data entered into the system. Do NOT enter any real personal data (e.g., financial information or otherwise) into the system. The assignment runs until May 31st 2023, at which time the server and all associated data will be destroyed."
      </div>
    </div>
  );
}
