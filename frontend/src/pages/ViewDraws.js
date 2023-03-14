import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import drawings from "../drawingData";
import "../Fonts/Sometimes.otf";
import "../styles/ViewPage.css";
import Rating from '@mui/material/Rating';


// Ctrl + k to comment out region
function ViewDrawings() {
const top = {
    // Other styles
    display: 'flex',
    flexDirection: 'row',
};

// stars fill states
const [filled, setFilled] = useState(drawings.map(() => [false, false, false, false, false]));

// fills in star when clicked and all previous stars
const handleClick = (index, id) => {
  const newFilled = [...filled]
  newFilled[id] = newFilled[id].map((value, i) => {
    if (i <= index) {
      return true;
    } else {
      return false;
  }
});
setFilled(newFilled);
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
          <div className="StarBarAvg">
            Rating
            <Rating className="StarRating" value={post.avgRating} readOnly precision={0.1} />
          </div>
        </div>


        <div className="UserElement">
          <div className="RateText">
            Rate the drawing?
          </div>
          <div className="StarBar">
            {[0, 1, 2, 3, 4].map((index) => (
              <Button
                key={index}
                // sets class name to each uniquely
                className={`Star${index+1} Stars`}
                onClick={() => handleClick(index, id)}
              >
              {filled[id][index] ? <AiFillStar size={25}/> : <AiOutlineStar size={25}/>}
              </Button>
            ))}
          </div>
          <Button className="SubmitButton">
            Submit Rating
          </Button>
        </div>


        <div className="UserElement">
          <Link to="/comments">

            <div className="CommentsBox">
              <div className="CommentHeading">
                Comments
              </div>
              <div className="Comment">
                
                <div className="CommentUsername">
                  {post.userCommenting}
                  
                </div>
                <div className="CommentText">
                  {post.comment}
                </div>
              </div>
            </div>

          </Link>
        </div>
      </div>
      </>
    )})}
    </div>
  );
}

export default ViewDrawings;