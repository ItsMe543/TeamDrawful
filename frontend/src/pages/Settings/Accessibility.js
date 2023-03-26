import React, { useState, useEffect } from "react";
import "../../styles/Settings/Light.css";
import "../../styles/Settings/Font.css";
import "../../styles/Settings/Contrast.css";
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Switch from "@mui/material/Switch";

const LIGHT_MODE_KEY = "isLightMode";
const CONTRAST_KEY = "isContrast";
const FONT_KEY = "isFont";

export default function Accessibility() {
    const PinkSwitch = styled(Switch)(({ theme }) => ({
        '& .MuiSwitch-switchBase.Mui-checked': {
            color: pink[600],
            '&:hover': {
                backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
            },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: pink[600],
        },
    }));

    const [isLightMode, setIsLightMode] = useState(() => {
        const stored = localStorage.getItem(LIGHT_MODE_KEY);
        return stored !== null ? JSON.parse(stored) : false;
    });
    const [isContrast, setContrast] = useState(() => {
        const stored = localStorage.getItem(CONTRAST_KEY);
        return stored !== null ? JSON.parse(stored) : false;
    });
    const [isFont, setFont] = useState(() => {
        const stored = localStorage.getItem(FONT_KEY);
        return stored !== null ? JSON.parse(stored) : false;
    });

    const toggleMode = () => {
        setIsLightMode(!isLightMode);
        setContrast(false);
    };

    const toggle = () => {
        setContrast(!isContrast);
        setIsLightMode(false);
    };

    const toggleFont = () => {
        setFont(!isFont);
    };


    useEffect(() => {
        localStorage.setItem(LIGHT_MODE_KEY, JSON.stringify(isLightMode));
        document.body.classList.toggle("light-mode", isLightMode);
    }, [isLightMode]);

    useEffect(() => {
        localStorage.setItem(FONT_KEY, JSON.stringify(isFont));
        document.body.classList.toggle("font", isFont);
    }, [isFont]);

    useEffect(() => {
        localStorage.setItem(CONTRAST_KEY, JSON.stringify(isContrast));
        document.body.classList.toggle("contrast", isContrast);
    }, [isContrast]);

    return (
        <div className="accessibility-container" style={{ paddingLeft: "250px" }}>
            <div style={{ fontSize: "40px" }}>Accessibility Settings</div>
            <div style={{ fontSize: "22px" }}>
                Light Mode
                <PinkSwitch
                    checked={isLightMode}
                    onChange={toggleMode}
                />
                <br></br>
                Font Switch
                <Switch
                    checked={isFont}
                    onChange={toggleFont}
                    color="primary"
                />
                <br></br>
                High Contrast Mode
                <Switch
                    checked={isContrast}
                    onChange={toggle}
                    color="warning"
                />
            </div>
        </div>
    );
}
