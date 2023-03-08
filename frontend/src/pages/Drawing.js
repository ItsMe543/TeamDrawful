import React from "react";
import "../styles/Drawing.css";


function Drawing() {
  return (
    <div>
      <div>
      </div>
      <div className="drawing_toolbar" >
        {/* Add drawing tool bar components here */}
        <button className="tool1">*Drawing tool</button>
      </div>
      <div className="prompt_bar">
        <div className="prompt">
          *This is where the prompt goes
        </div>
      </div>
      <div className="canvas">
        <div className="time">
          *Time here
        </div>

      </div>
    </div>
  );
}

export default Drawing;