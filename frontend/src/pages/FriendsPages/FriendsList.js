import { List, Paper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import drawings from "../../drawingData.js";
import "../../styles/Friends/FriendsList.css";

function FriendsList() {
  
  return (
    <div className="Profiles-container">
      <Col className="Friend-side">
          <input className="F-search-bar" type="text" placeholder="   Search" />
            <div className="Friends-list">
                <List>
                    List
                </List>
            </div>
      </Col>

      <Col className="Profile-side">
        <div className="Profile-details">
          THIS IS WHERE THE PROFILE WILL GO
        </div>
      </Col>
    </div>
  );
}
        
export default FriendsList;