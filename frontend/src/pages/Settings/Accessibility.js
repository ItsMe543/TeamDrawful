import React, { useState, useEffect } from "react";
import "../../styles/Settings/Accessibility.css";

export default function Accessibility() {
    const [isLightMode, setIsLightMode] = useState(false);

    const toggleMode = () => {
        setIsLightMode(!isLightMode);
    };

    useEffect(() => {
        document.body.classList.toggle("light-mode", isLightMode);
    }, [isLightMode]);

    return (
        <div className="accessibility-container" style={{ paddingLeft: "250px" }}>
            <div style={{ fontSize: "40px" }}>Accessibility Settings</div>
            <div>
                <button
                    onClick={toggleMode}
                    style={{
                        fontSize: '30px',
                        width: "70px",
                        height: "50px",
                        border: "2px solid #ccc",
                        backgroundColor: isLightMode ? "#3f51b5" : "white",
                        cursor: "pointer",
                        position: "relative",
                    }}
                >Light</button>
            </div>
        </div>
    );
}
