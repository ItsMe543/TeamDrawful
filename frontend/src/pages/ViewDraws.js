import React from "react";
import { Button } from "react-bootstrap";
import { AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import drawings from "../drawingData";
import "../Fonts/Sometimes.otf";
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
      {drawings.map((post,id) =>{
        return(
    <>


      <h2 className="PromptName">
        Prompt: {post.prompt}
      </h2>

      <div className="UserProfile">

        <div className="UserElement">
          <img src={post.drawing} alt={"drawing image"}/>
        </div>

        <div className="UserElement">
          <div className="UserName">
            {post.username}
          </div>
          <div className="Stats">
            Completed: {post.completedTime} - {post.completedDate}
          </div>
          <div className="Stats">
            Difficulty: {post.difficulty} / 5
          </div>
          <div className="Stats">
            Time taken: {post.timeTaken} seconds
          </div>
          <div className="StarBar">
            Rating <p/>
          {[...Array(Math.round(post.avgRating))].map((x,i)=>

                <div className="StarRating">
                   <AiOutlineStar size={35}/>
                </div>

          )}
          </div>

{/*
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
          </div> */}
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
      </>
    )})}
    </div>
  );
}

export default ViewDrawings;