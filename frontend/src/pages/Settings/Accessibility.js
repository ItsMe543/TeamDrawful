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
                        fontSize: '25px',
                        width: "60px",
                        height: "40px",
                        border: "1px solid black",
                        backgroundColor: isLightMode ? "#3f51b5" : "white",
                        position: "relative",
                    }}
                >Light</button>
            </div>
        </div>
    );
}
