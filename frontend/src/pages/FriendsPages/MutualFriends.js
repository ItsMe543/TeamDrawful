import { Box } from "@mui/system";
import React from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import drawings from "../../drawingData.js";
import "../../styles/Friends/MutualFriends.css";

function MutualFriends() {
  
  return (
    <div className="Profiles-Container">
        <div className="search-bar">
            <input type="text" placeholder="   Search" />
        </div>
    </div>
  );
}
        
export default MutualFriends;