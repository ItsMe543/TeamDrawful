import React from "react";
import { Button } from "react-bootstrap";
import { AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import "../Fonts/Sometimes.otf"
import "../styles/ViewPage.css";


// Ctrl + k to comment out region
function ViewDrawings() {
const top = {
    // Other styles
    display: 'flex',
    flexDirection: 'row',
};

  return (
    <div>
      <h1 className="Title">
        Today's Pictures
      </h1>

      <h2 className="PromptName">
        Prompt: INSERT PROMPT
      </h2>

      <div className="UserProfile">
          
        <div className="UserElement">
          DRAWING GOES HERE
        </div>

        <div className="UserElement">
          <div className="UserName">
            ExampleUser001
          </div>
          <div className="Stats">
            TIME COMPLETED GOES HERE
          </div>
          <div className="Stats">
            DIFFICULTY GOES HERE
          </div>
          <div className="Stats">
            TIME TAKEN GOES HERE
          </div>

          <div className="StarBar">
            <Button className="Star1">
              <AiOutlineStar size={20}/>
            </Button>
            <Button className="Star">
              <AiOutlineStar size={20}/>
            </Button>
            <Button className="Star">
              <AiOutlineStar size={20}/>
            </Button>
            <Button className="Star">
              <AiOutlineStar size={20}/>
            </Button>
            <Button className="Star5">
              <AiOutlineStar size={20}/>
            </Button>
          </div>
        </div>

        
        <div className="UserElement">
          Rate the drawing?
          <div className="StarBar">
            <Button className="Star1">
              <AiOutlineStar size={35}/>
            </Button>
            <Button className="Star">
              <AiOutlineStar size={35}/>
            </Button>
            <Button className="Star">
              <AiOutlineStar size={35}/>
            </Button>
            <Button className="Star">
              <AiOutlineStar size={35}/>
            </Button>
            <Button className="Star5">
              <AiOutlineStar size={35}/>
            </Button>
          </div>
        </div>
        
        <div className="UserElement">
          <Button className="CommentButton">
            CommentSecion
          </Button>
        </div>
      </div>
      
    </div>
  );
}

export default ViewDrawings;