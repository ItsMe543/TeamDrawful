import { Box } from "@mui/system";
import React from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import drawings from "../../drawingData.js";
import "../../styles/Comments.css";

function FriendsList() {
  
  return (
    <>
        <div className="friends-container">
            TestTIngs
        </div>
        <div className="search-bar">
            <input type="text" placeholder="   Search" />
          </div>
    </>
  );
}
        
export default FriendsList;