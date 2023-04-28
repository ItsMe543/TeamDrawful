import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import drawings from "../../drawingData.js";
import "../../styles/Friends/FriendsList.css";
import { VscCircleFilled } from "react-icons/vsc";

//import drawings from "../../drawingData";

function FriendsList() {


  const [selected, setSelected] = useState(0);
  
  const handleSelectionClick = (fProfile) => {
    setSelected(fProfile);
  };

  const [friendsAdded, setFriendsAdded] = useState([]);



  return (
    <div className="Profiles-container">
      <Col className="Friend-side">
        <div className="Friends-title">Friends list</div>
        <input className="F-search-bar" type="text" placeholder="Search friends list" />
        
        <div className="Friends-list">

          {/*HERE*/}
          {drawings.map((post, id) => { 

            return ( 

              //HERE
              <button className="User-preview" onClick={() => handleSelectionClick(post.id)}> 

                {/*HERE*/}
                <img className="Friend-picture" src={post.drawing} alt={"drawing image"} /> 

                <VscCircleFilled className="Friend-status"/>
                <Col>
                  <div className="Friend-username">

                    {/*HERE*/}
                    {post.username}

                  </div>
                </Col>
              </button>
            )})}
        </div>
      </Col>


      <Col className="Profile-side">
        <div className="Details-to-fill">

          {/*HERE*/}
          {drawings.map((post, id) => {

            //HERE
            if (post.id == selected){

             return(
          
          <div className="Profile-details">
            
            <Row>
              <Col>

                 {/*HERE*/}
                <img className="Profile-picture" src={post.drawing} alt={"pfp image"} />

              </Col>

              <Col>
              <div className="Profile-bio-container">
                <div className="Profile-bio">

                  {/*HERE*/}
                  {post.bio}

                </div>
              </div>
              </Col>
            </Row>

            <Row>
              <Col>
              <div className="Profile-username">

                 {/*HERE*/}
                {post.username}

              </div>
              </Col>
              <Col>
                <div className="Profile-section-header1">
                  Favourite Draw
                </div>
              </Col>
            </Row>

            <Row>
              <Col>
                <div className="Profile-stat-bar">

                  {/*HERE*/}
                  Highest Streak: {post.highestStreak}

                </div>
                <div className="Profile-stat-bar">

                  {/*HERE*/}
                  Average Rating: {post.averageRating}

                </div>
                <div className="Profile-stat-bar">

                  {/*HERE*/}
                  Total Stars Earned: {post.totalStars}

                </div>
                <div className="Profile-stat-bar">

                  {/*HERE*/}
                  Badges Unlocked:  {post.badgesUnlocked}

                </div>
              </Col>

              <Col>

                 {/*HERE*/}
                <img className="Profile-fav-draw" src={post.favouriteDraw} alt={"fav draw image"} />

              </Col>

            </Row>

            <Row>
              <Col>
                <button className="Profile-unfriend-button">
                  Unfriend
                </button>
              </Col>
              <Col>

                    {/*HERE*/}
                  <Link to={"/friends/memories/" + post.username}>
                    <button className="Profile-view-memories">
                      Memories
                    </button>
                  </Link>
              </Col>
            </Row>

            <Row>
            <Col>
                <div className="Profile-section-header2">
                  Badges
                </div>
              </Col>
            </Row>

            <Row>
              <Col>
                <div className="Profile-badges-container">

                {/*HERE*/}
                {post.badges.map((badges,id) =>{

                  return(

                    //HERE
                    <img className="Profile-badge-icon" src={badges.badgeIcon} alt={"Badgeicon"} />

                  )})}
                </div>
              </Col>
            </Row>


          </div>
             )}})}
        </div>
      </Col>

    </div>
  );
}
        
export default FriendsList;