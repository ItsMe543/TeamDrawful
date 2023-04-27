import Rating from "@mui/material/Rating";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import "../Fonts/Sometimes.otf";

import "../styles/ViewPage.css";

// Ctrl + k to comment out region
function ViewDrawings() {
  const [posts, setPosts] = useState([]);
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(true);
  const top = {
    // Other styles
    display: "flex",
    flexDirection: "row",
  };

  // stars fill states
  const [filled, setFilled] = useState(
    posts.map(() => [false, false, false, false, false])
  );

  // fills in star when clicked and all previous stars
  const handleClick = (index, id) => {
    const newFilled = [...filled];
    newFilled[id] = newFilled[id].map((value, i) => {
      if (i <= index) {
        return true;
      } else {
        return false;
      }
    });
    setFilled(newFilled);
  };
  const getData = () => {
    let today = new Date();
    const day = today.getDate();
    let month = today.getMonth() + 1;
    month = month.toString().padStart(2, "0");
    const year = today.getFullYear();
    let formattedDate = year + "-" + month + "-" + day;

    axios
      .get("/api/user_memories/?date=" + formattedDate)
      .then((data) => {
        setPosts(data.data);

        setLoading(false);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);

          setErrors({
            code: error.response.status,
            message: error.response.data,
          });
        }
      });
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(posts);
  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <h1 className="Title">Today's Pictures</h1>

      {posts.map((post, id) => {
        return (
          <>
            <h2 className="PromptName">Today's Prompt: {post.prompt}</h2>
            <div className="UserProfile">
              <div className="userDrawing">
                <img src={post.drawing} alt={"drawing image"} />
              </div>

              <div className="UserElement">
                <div className="UserName">{post.username}</div>
                <div className="Stats">
                  Completed: {post.completedTime} - {post.date}
                </div>
                <div className="Stats">Difficulty: {post.difficulty} / 5</div>
                <div className="Stats">Time taken: {post.timeTaken}</div>
                <div className="StarBarAvg">
                  Rating
                  <Rating
                    className="StarRating"
                    value={1}
                    readOnly
                    precision={0.1}
                  />
                </div>
              </div>

              {/* <div className="Ratings">
                <div className="RateText">Rate the drawing?</div>
                <div className="StarBar">
                  {[0, 1, 2, 3, 4].map((index) => (
                    <Button
                      key={index}
                      // sets class name to each uniquely
                      className={`Star${index + 1} Stars`}
                      onClick={() => handleClick(index, id)}
                    >
                      {filled[id][index] ? (
                        <AiFillStar size={25} />
                      ) : (
                        <AiOutlineStar size={25} />
                      )}
                    </Button>
                  ))}
                </div>
                <Button className="SubmitButton">Submit Rating</Button>
              </div> */}

              <div className="UserElement">
                {/* <Link to={"/comments/" + post.id}>
                  <div className="CommentsBox">
                    <div className="CommentHeading">Comments</div>
                    <div className="Comment">
                      {post.Comments.map((Comments, id) => {
                        return (
                          <>
                            <div className="CommentUsername">
                              {Comments.UserCommenting}:
                            </div>

                            <div className="CommentText">
                              {Comments.Comment}
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </Link> */}
              </div>
            </div>
          </>
        );
      })}
      <div className="disclaimer1">
        "Alpha Project Disclaimer This server is provided by the School of
        Computer Science at the University of Birmingham to allow users to
        provide feedback on software developed by students as part of an
        assignment. While we take reasonable precautions, we cannot guarantee
        the security of the data entered into the system. Do NOT enter any real
        personal data (e.g., financial information or otherwise) into the
        system. The assignment runs until May 31st 2023, at which time the
        server and all associated data will be destroyed."
      </div>
    </div>
  );
}

export default ViewDrawings;
