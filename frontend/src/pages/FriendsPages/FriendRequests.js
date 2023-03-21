import { Box } from "@mui/system";
import React from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import drawings from "../../drawingData.js";
import "../../styles/Comments.css";

function FriendRequests() {
  
  return (
    <>
        <div className="Greet">
            HELLO HAHAHAH this is da fren reqs
        </div>
        <div className="search-bar">
            <input type="text" placeholder="   Search" />
          </div>
    </>
  );
}
        
export default FriendRequests;