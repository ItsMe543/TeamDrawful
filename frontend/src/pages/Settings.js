import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Account from "../pages/Settings/Account";
import Security from "../pages/Settings/Security";
import Accessibility from "../pages/Settings/Accessibility";
import "../styles/Settings.css";

export default function Settings() {
  const [active, setActive] = useState("account");
  const [topPosition, setTopPosition] = useState(90);
  const [opacity, setOpacity] = useState(1);
  const [popupVisible, setPopupVisible] = useState(false);

  const handleSectionClick = (section) => {
    setActive(section);
  };

  const handleSearchInputChange = (event) => {
    const searchInput = event.target.value.toLowerCase();

    const accessibilityKeywords = /(light|dark|font|contrast|accessibility|mode|high|toggle|switch|appearance|display|general|notifications|sound)/;
    const accountKeywords = /(account|badges|stats|name|username|email|bio|address|settings|personal|edit|profile|picture|changes|cancel|save|memories)/;
    const securityKeywords = /(security|privacy|hide|login|password|reset|status|logout|online|offline)/;

    if (accessibilityKeywords.test(searchInput)) {
      setActive("accessibility");
    }
    if (accountKeywords.test(searchInput)) {
      setActive("account");
    }
    if (securityKeywords.test(searchInput)) {
      setActive("security");
    }
  };

  const sections = [
    { id: "security", component: <Security /> },
    { id: "account", component: <Account /> },
    { id: "accessibility", component: <Accessibility /> }
  ];

  useEffect(() => {
    function handleScroll() {
      const verticalPosition = window.scrollY;
      const horizontalPosition = window.scrollX;
      let opacity = 1;
      if (horizontalPosition > 30 && horizontalPosition <= 60) {
        opacity = 0.8;
      } else if (horizontalPosition > 60 && horizontalPosition <= 90) {
        opacity = 0.6;
      } else if (horizontalPosition > 90 && horizontalPosition <= 120) {
        opacity = 0.4;
      } else if (horizontalPosition > 120 && horizontalPosition <= 150) {
        opacity = 0.2;
      } else if (horizontalPosition > 150) {
        opacity = 0;
      }
      setOpacity(opacity);
      setTopPosition(90 - verticalPosition);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePopupClick = () => {
    setPopupVisible(!popupVisible);
  };

  const handleLogoutClick = () => {

  };

  return (
    <div className="settings-container">
      <div className="menu" style={{
        top: `${topPosition}px`,
        opacity: `${opacity}`,
        transition: "opacity 0.2s ease-in-out"
      }}>
        <div className="menu-header">
          Settings
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search" onKeyDown={handleSearchInputChange} />
        </div>
        <div>
          <button className="buttonstyle" onClick={() => handleSectionClick("account")}>
            Account
          </button>
          <br />
          <button className="buttonstyle" onClick={() => handleSectionClick("accessibility")}>
            Accessibility & General
          </button>
          <br />
          <button className="buttonstyle" onClick={() => handleSectionClick("security")}>
            Privacy & Security
          </button>
          <br />
          <br />
          <button className="buttonstyleMore" onClick={handlePopupClick}>
            More
          </button>
          {popupVisible && (
            <div className="popup">
              <button onClick={handleLogoutClick}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="settings-sections">
        {sections.map((section) => (
          <div className={`section ${active === section.id.replace("-section", "") ? "active" : ""}`}>
            {section.component}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '50px', marginLeft: '-40px' }} className="disclaimer1">
        "Alpha Project Disclaimer This server is provided by the School of Computer Science at the University of Birmingham to allow users to provide feedback on software developed by students as part of an assignment. While we take reasonable precautions, we cannot guarantee the security of the data entered into the system. Do NOT enter any real personal data (e.g., financial information or otherwise) into the system. The assignment runs until May 31st 2023, at which time the server and all associated data will be destroyed."
      </div>
    </div >
  );
}
