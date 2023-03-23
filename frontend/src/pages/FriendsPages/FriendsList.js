import { List, Paper } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import drawings from "../../drawingData.js";
import "../../styles/Friends/FriendsList.css";
import { VscCircleFilled } from "react-icons/vsc";
//import drawings from "../../drawingData";

function FriendsList() {
  return (
    <div className="Profiles-container">
      <Col className="Friend-side">
          <input className="F-search-bar" type="text" placeholder="   Search" />
          
          <div className="Friends-list">
          {drawings.map((post, id) => {
            return (
              <button className="User-preview">
                <img className="Friend-picture" src={post.drawing} alt={"drawing image"} />
                <VscCircleFilled className="Friend-status"/>
                <div className="Friend-username">
                  {post.username}
                </div>
              </button>
            )})}
          </div>

      </Col>

      <Col className="Profile-side">
        <div className="Profile-details">
          
          <Row>
            <Col>
              <img className="Profile-picture" src="/drawings/car.jpg" alt={"pfp image"} />
            </Col>

            <Col>
            <div className="Profile-bio-container">
              <div className="Profile-bio">
                Hello this is my life story i wrote this without any corrections beacuase eme cool and this is only a test ahhahahah but for realthis is just a test of filling the bio, It will go here :D
              </div>
            </div>
            </Col>
          </Row>

          <Row>
            <Col>
            <div className="Profile-username">
              CoolUser420
            </div>
            </Col>
            <Col>
              <div className="Profile-section-header1">
                Favourtie Draw
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="Profile-stat-bar">
                Highest Streak:
              </div>
              <div className="Profile-stat-bar">
                Average Rating:
              </div>
              <div className="Profile-stat-bar">
                Total Stars Earned:
              </div>
              <div className="Profile-stat-bar">
                Badges Unlocked: 
              </div>
            </Col>

            <Col>
              <img className="Profile-fav-draw" src="/drawings/car.jpg" alt={"fav draw image"} />
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
                This is where the badges will go
              </div>
            </Col>
          </Row>


        </div>
      </Col>
    </div>
  );
}
        
export default FriendsList;