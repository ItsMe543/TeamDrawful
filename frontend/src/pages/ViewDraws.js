import React from "react";
import { Button } from "react-bootstrap";
import { AiOutlineStar } from "react-icons/ai";
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

  const [ratings, setRating] = React.useState(new Array(drawings.length).fill(2));

  const handleChange = (index, newValue) => {
    const newRating = [...ratings];
    newRating[index] = newValue;
    setRating(newRating);
  };

  return (
    <div>
      <h1 className="Title">
        Today's Pictures
      </h1>
      {drawings.map((post, id) => {
        const index = id;
        return (
          <>


            <h2 className="PromptName">
              Prompt: {post.prompt}
            </h2>

            <div className="UserProfile">

              <div className="UserElement">
                <img src={post.drawing} alt={"drawing image"} />
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
                  Rating
                  <Rating className="ReadOnly" value={post.avgRating} readOnly precision={0.1} />
                </div>
              </div>


              <div className="UserElement">
                Rate the drawing?
                <div className="StarBar">
                  <Rating
                    size="large"
                    value={ratings[index]}
                    onChange={(event, newValue) => handleChange(index, newValue)}
                  />
                </div>
              </div>

              <div className="UserElement">
                <Button className="CommentButton">
                  CommentSecion
                </Button>
              </div>
            </div>
          </>
        )
      })}
    </div>
  );
}

export default ViewDrawings;