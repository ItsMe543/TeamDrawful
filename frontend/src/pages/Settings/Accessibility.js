import React, { useState, useEffect } from "react";
import "../../styles/Settings/Accessibility.css";

export default function Accessibility() {
    const [isLightMode, setIsLightMode] = useState(false);

    const toggleMode = () => {
        setIsLightMode(!isLightMode);
    };

    const [isContrast, setConstrast] = useState(false);

    const toggle = () => {
        setConstrast(!isContrast);
    };



    const [isFont, setFont] = useState(false);

    const toggleFont = () => {
        setFont(!isFont);
    };

    useEffect(() => {
        document.body.classList.toggle("light-mode", isLightMode);
    }, [isLightMode]);

    useEffect(() => {
        document.body.classList.toggle("font", isFont);
    }, [isFont]);

    useEffect(() => {
        document.body.classList.toggle("contrast", isContrast);
    }, [isContrast]);

    return (
        <div className="accessibility-container" style={{ paddingLeft: "250px" }}>
            <div style={{ fontSize: "40px" }}>Accessibility Settings</div>
            <div>
                <button
                    onClick={toggleMode}
                    style={{
                        fontSize: '25px',
                        width: "70px",
                        height: "40px",
                        border: "1px solid black",
                        backgroundColor: isLightMode ? "#3f51b5" : "white",
                        position: "relative",
                    }}
                >Light</button>
                <button
                    onClick={toggleFont}
                    style={{
                        fontSize: '25px',
                        width: "70px",
                        height: "40px",
                        border: "1px solid black",
                        backgroundColor: isFont ? "#3f51b5" : "white",
                        marginLeft: "20px",
                        position: "relative",
                    }}
                >Font</button>
                <button
                    onClick={toggle}
                    style={{
                        fontSize: '25px',
                        width: "70px",
                        height: "40px",
                        border: "1px solid black",
                        backgroundColor: isContrast ? "#3f51b5" : "white",
                        marginLeft: "20px",
                        position: "relative",
                    }}
                >Contrast</button>
            </div>
        </div>
    );
}
