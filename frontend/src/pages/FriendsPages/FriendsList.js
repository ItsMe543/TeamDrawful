import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import drawings from "../../drawingData.js";
import "../../styles/Friends/FriendsList.css";
import { VscCircleFilled } from "react-icons/vsc";
import { BsPersonSquare, BsFillTaxiFrontFill} from "react-icons/bs"
import validator from "validator";
import axios from "axios";


function FriendsList() {


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


  const [friendsAdded, setFriendsAdded] = useState([]);

  useEffect(() => {
    axios.get("/getFriendsByUsername", { params: { username: getUsername() } }).then((data) => {
      setFriendsAdded(data?.data);
        });
  }, [getUsername()])





  function friendsListDisplay () {
    if (friendsAdded.length < 1){
      return(
        <button className="User-preview">
            {/*<img className="Friend-picture" src={post.drawing} alt={"drawing image"} /> */}
            <BsPersonSquare className="Friend-picture" />
            <VscCircleFilled className="Friend-status"/>
            <Col>
              <div className="Friend-username">
                Username
            </div>
          </Col>
        </button>
      );
    } else {
      return(
        <div>
        {console.log("FRend are: " + friendsAdded)}
        {friendsAdded.map((post, id) => {
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
      )
    }
  }












  function friendProfileDisplay() {
    if (friendsAdded.length < 1){
      return (
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
                <button className="Profile-unfriend-button-default" disabled={true}>
                  Unfriend
                </button>
              </Col>

              <Col>
                  <button className="Profile-view-memories-default" disabled={true}>
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
                
                </div>
              </Col>
            </Row>

          </div>
        </div>
      )
    } else {
      return (
        <div>
          {friendsAdded.map((post, id) => {
            //HERE
            if (post.id == selected){
             return(
          
              <div className="Profile-details">
                <Row>
                  <Col>
                    {/*HERE*/}
                    <img className="Profile-picture" src={post.profilePicture} alt={"pfp image"} />
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
                      Highest Streak: {post.maxSteak}
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
                      Badges Unlocked:  {post.badgesEarned}
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
                      <button className="Profile-view-memories">

                        {/*HERE*/}
                        <Link to={"/friends/memories/" + post.id}>

                          Memories
                        </Link>
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
      )
    }
  }


  







  return (
    <div className="Profiles-container">
      <Col className="Friend-side">
        <div className="Friends-title">Friends list</div>
        <input className="F-search-bar" type="text" placeholder="Search friends list" />
        
        <div className="Friends-list">
          {friendsListDisplay()}
        </div>
      </Col>


      <Col className="Profile-side">
        <div className="Details-to-fill">
          {friendProfileDisplay()}
        </div>
      </Col>

    </div>
  );
}
        
export default FriendsList;