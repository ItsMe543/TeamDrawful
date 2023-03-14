import { Box } from "@mui/system";
import React from "react";
import "../styles/Comments.css"
import drawings from "../drawingData.js";

function Comments() {
  return (
    //<div style={{ fontSize: '25px', color: "white" }} >Badges</div>
    <div>
        <h1 className="Heading">
            Comments:
        </h1>

        <div className="CommentSection">
            Mesg example
        </div>

    </div>
  );
}

export default Comments;