import { Box } from "@mui/system";
import React from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import drawings from "../drawingData.js";
import "../styles/Comments.css";

function Comments() {
  const {ID} = useParams();
  const post = drawings[ID]
  return (
    //<div style={{ fontSize: '25px', color: "white" }} >Badges</div>
    <div>
        <h1 className="Heading">
            Comments:
        </h1>
        <div className="CommentSection">
          {post.Comments.map((Comments,id) =>{
            return(
                <div className="CommentBar">
                    <div className="Username">
                      {Comments.UserCommenting}
                    </div>
                    <div className="CommentMesg">
                      {Comments.Comment}
                    </div>
                </div>
            )})}
          </div>
          <div className="CommentTextBox">
            <input type="text" placeholder="   Comment" />
          </div>
          
          <div className="SubCom">
            <Button>
              Send Comment
            </Button>
          </div>
     </div>
  )
}
        
export default Comments;
