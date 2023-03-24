import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import drawings from "../../drawingData.js";
import "../../styles/Friends/FriendsList.css";
import { VscCircleFilled } from "react-icons/vsc";

//import drawings from "../../drawingData";

function FriendsList() {

  //Hooks in react
  //  const [varName, setName] = useState(Value);
  //To update a hook:
  //  <button onClick={() => setCount(count + 1)}>
  //    Click me
  //  </button>

  const [selected, setSelected] = useState(1);
  
  const handleSelectionClick = (fProfile) => {
    setSelected(fProfile);
  };

  //{drawings.map((post, id) => {
    //const friendsProfiles = [
      //{ id: post.id, component: <post /> }
    //];
  //})};

  return (
    <div className="Profiles-container">
      <Col className="Friend-side">
        <div className="Friends-title">Friends list</div>
        <input className="F-search-bar" type="text" placeholder="Search friends list" />
        
        <div className="Friends-list">
          {drawings.map((post, id) => {
            return (
              <button className="User-preview" onClick={() => handleSelectionClick(post.id)}>
                <img className="Friend-picture" src={post.drawing} alt={"drawing image"} />
                <VscCircleFilled className="Friend-status"/>
                <Col>
                  <div className="Friend-username">
                    {post.username}
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
                <img className="Profile-picture" src={post.drawing} alt={"pfp image"} />
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
                <button className="Profile-view-memories">
                  Memories
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