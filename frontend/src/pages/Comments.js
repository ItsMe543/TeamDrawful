import { Box } from "@mui/system";
import React from "react";


function Comments() {
  return (
    //<div style={{ fontSize: '25px', color: "white" }} >Badges</div>
    <div>
        <h1 className="commentHeading">
            Comments
        </h1>
        <h2 className="username">
            EXAMPLEuser007
        </h2>
        <div>
            <Box>
                testing
            </Box>
        </div>
    </div>
  );
}

export default Comments;