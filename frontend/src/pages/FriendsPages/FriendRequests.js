import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import drawings from "../../drawingData.js";
import "../../styles/Friends/FriendRequests.css";
import { VscCircleFilled } from "react-icons/vsc";

function FriendRequests() {
  
  //return (
    //<div className="Profiles-container">
        //<div className="search-bar">
            //<input type="text" placeholder="   Search" />
        //</div>
    //</div>
  //);
  const [selected, setSelected] = useState(0);
  
  const handleSelectionClick = (fProfile) => {
    setSelected(fProfile);
  };
  return (
    <div className="Profiles-container">
      <Col className="Friend-r-side">
        <div className="Requests-title">Friend Requests</div>
        
        <div className="Friends-r-list">
          {drawings.map((post, id) => {
            return (
              <button className="User-r-preview"  id={id} onClick={() => handleSelectionClick(post.id)}>
                <img className="Friend-r-picture"  id={id} src={post.drawing} alt={"drawing image"} />
                <VscCircleFilled className="Friend-r-status"/>
                <Col>
                  <div className="Friend-r-username">
                    {post.username}
                  </div>
                  <div className="Mutual-m-friends">
                      {post.mutualFriends} Mutual friends
                  </div>
                </Col>
              </button>
            )})}
        </div>
      </Col>


      <Col className="Profile-side">
        <div className="Details-to-fill">

          
          {drawings.map((post, id) => {
            if (post.id == selected){
             return(
          
          <div className="Profile-details">
            
            <Row>
              <Col>
                <img className="Profile-picture"  id={id} src={post.drawing} alt={"pfp image"} />
              </Col>

              <Col>
              <div className="Profile-bio-container">
                <div className="Profile-bio">
                  {post.bio}
                </div>
              </div>
              </Col>
            </Row>

            <Row>
              <Col>
              <div className="Profile-username">
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
                  Highest Streak: {post.highestStreak}
                </div>
                <div className="Profile-stat-bar">
                  Average Rating: {post.averageRating}
                </div>
                <div className="Profile-stat-bar">
                  Total Stars Earned: {post.totalStars}
                </div>
                <div className="Profile-stat-bar">
                  Badges Unlocked:  {post.badgesUnlocked}
                </div>
              </Col>

              <Col>
                <img className="Profile-fav-draw"  id={id} src={post.favouriteDraw} alt={"fav draw image"} />
              </Col>

            </Row>

            <Row>
              <Col>
                <button className="Profile-r-reject">
                  Reject
                </button>
              </Col>
              <Col>
                <button className="Profile-r-accept">
                  Accept
                </button>
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
                {post.badges.map((badges,id) =>{
                  return(
                    <img className="Profile-badge-icon"  id={id} src={badges.badgeIcon} alt={"Badgeicon"} />
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
        
export default FriendRequests;