import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import "../Fonts/Sometimes.otf"
import "../styles/ViewPage.css";


// Ctrl + k to comment out region
function ViewDrawings() {
  const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5
        }}
    />
);
const top = {
    // Other styles
    display: 'flex',
    flexDirection: 'row',
}
  return (
    <div>
      <h1 className="Title">
        Today's Pictures
      </h1>

      <div className="UserProfile">
          
        <div className="UserElement">
          Drawing goes here
        </div>

        <div className="UserElement">
          Loaing Userdeets...
        </div>

        <div className="UserElement">
          Rating bar goes here
        </div>
        <div className="UserElement">
        <div className="StarBar">
          <div className="Star">
            <AiOutlineStar size={20}/>
          </div>
        </div>
        </div>


        <div className="UserElement">
          CommentSecion
        </div>
      </div>
    </div>
  );
}

export default ViewDrawings;