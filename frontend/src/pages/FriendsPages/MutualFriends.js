import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import drawings from "../../drawingData.js";
import "../../styles/Friends/MutualFriends.css";
import { VscCircleFilled } from "react-icons/vsc";
import axios from "axios";
import validator from "validator";
import { BsPersonSquare, BsFillTaxiFrontFill} from "react-icons/bs"

//import drawings from "../../drawingData";

function MutualFriends() {

  const [selected, setSelected] = useState(0);
  
  const handleSelectionClick = (fProfile) => {
    setSelected(fProfile);
  };

  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = validator.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }

  function getUsername() {
    return getCookie('username');
  }

  
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    axios.get("/getUsernames", { params: { username: getUsername() } }).then((data) => {
      setAllUsers(data?.data.allUsers);
        });
  }, [getUsername()])
  




  function displayAllUsers() {
    if (allUsers.length < 1){
      return(
        <button className="User-preview">
          <BsPersonSquare className="Friend-picture" />
          <VscCircleFilled className="Friend-status"/>
          <Col>
            <div className="Friend-username">
                Username
            </div>
          </Col>
        </button>
      );
    } else{
      <div>
        {allUsers.map((post, id) => {
          //console.log("helloHA");
          return ( 
            <button className="User-preview" onClick={() => handleSelectionClick(post.id)}> 
              <img className="Friend-picture" src={post.profilePicture} alt={"drawing image"} /> 
              <VscCircleFilled className="Friend-status"/>
              {console.log("Unga Bunga" + post.username)}
              <Col>
                <div className="Friend-username">
                  {post.username}
                </div>
              </Col>
            </button>
          )})}
        </div>
    }
  }







  function displayUserProfile() {
    if (allUsers.length < 1) {
      return(
          <div>
            <div className="Profile-details">
              <Row>
                <Col>
                  <BsPersonSquare className="Profile-picture"/>
                </Col>

                <Col>
                  <div className="Profile-bio-container">
                    <div className="Profile-bio">
                      This is where my bio would be if I were your friend!
                    </div>
                  </div>
                </Col>
              </Row>


              <Row>
                <Col>
                  <div className="Profile-username">
                    Username
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
                    Highest Streak: 0
                  </div>
                  <div className="Profile-stat-bar">
                    Average Rating: 0
                  </div>
                  <div className="Profile-stat-bar">
                    Total Stars Earned: 0
                  </div>
                  <div className="Profile-stat-bar">
                    Badges Unlocked: 0
                  </div>
                </Col>

                <Col>
                  <BsFillTaxiFrontFill className="Profile-fav-draw"/>
                </Col>
              </Row>


              <Row>
                <Col>
                  <button className="Profile-unfriend-mf-button" disabled>
                    Unfriend
                  </button>
                </Col>
                <Col>
                  <button className="Profile-befriend-button">
                     Befriend
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
                  
                  </div>
                </Col>
              </Row>

            </div>
          </div>
      )
    } else {
      {allUsers.map((post, id) => {
        if (post.id == selected){
         return(
      
      <div className="Profile-details">
        
        <Row>
          <Col>
            <img className="Profile-picture" src={post.profilePicture} alt={"pfp image"} />
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
              Highest Streak: {post.maxStreak}
            </div>
            <div className="Profile-stat-bar">
              Average Rating: {post.averageRating}
            </div>
            <div className="Profile-stat-bar">
              Total Stars Earned: {post.totalStars}
            </div>
            <div className="Profile-stat-bar">
              Badges Unlocked:  {post.badgesEarned}
            </div>
          </Col>

          <Col>
            <img className="Profile-fav-draw" src={post.favouriteDraw} alt={"fav draw image"} />
          </Col>

        </Row>

        <Row>
          <Col>
            <button className="Profile-unfriend-mf-button" disabled>
              Unfriend
            </button>
          </Col>
          <Col>
            <button className="Profile-befriend-button">
              Befriend
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
            
            </div>
          </Col>
        </Row>


      </div>
         )}})}
    }
  }










  return (
    <div className="Profiles-container">
      <Col className="Friend-m-side">
        <div className="Mutual-title">Find Friends</div>
          <input className="F-m-search-bar" type="text" placeholder="Search users" />
          
          <div className="Friends-m-list">
            {displayAllUsers()}
          </div>
      </Col>


      <Col className="Profile-side">
        <div className="Details-to-fill">
          {displayUserProfile()}
        </div>
      </Col>

    </div>
  );
}
        
export default MutualFriends;