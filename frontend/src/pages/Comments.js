import { Box } from "@mui/system";
import React from "react";
import { useParams } from "react-router-dom";
import drawings from "../drawingData.js";
import "../styles/Comments.css";

function Comments() {
  return (
    //<div style={{ fontSize: '25px', color: "white" }} >Badges</div>
    <div>
      <h1 className="Heading">Comments:</h1>

      <div className="CommentSection">Mesg example</div>
    </div>
  );
}

export default Comments;
