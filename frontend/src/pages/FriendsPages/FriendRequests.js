import { Box } from "@mui/system";
import React from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import drawings from "../../drawingData.js";
import "../../styles/Friends/FriendRequests.css";

function FriendRequests() {
  
  return (
    <div className="Profiles-container">
        <div className="search-bar">
            <input type="text" placeholder="   Search" />
        </div>
    </div>
  );
}
        
export default FriendRequests;