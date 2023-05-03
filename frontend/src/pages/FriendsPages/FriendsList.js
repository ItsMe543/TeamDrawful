import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import drawings from "../../drawingData.js";
import "../../styles/Friends/FriendsList.css";
import { VscCircleFilled } from "react-icons/vsc";
import { BsPersonSquare, BsFillTaxiFrontFill } from "react-icons/bs"
import validator from "validator";
import axios from "axios";
//import { List } from "native-base";


function FriendsList() {


  const [selected, setSelected] = useState("");

  var selec2ded = "";


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
  const [storeFriendsNames, setFriendsNames] = useState([]);
  const friendsNames = [];
  const friends = [];
  const finalIdea = []


  var running2 = false;
  var running = false;
  var running3 = false;
  function pog(){
    console.log("yeet");
  }

  function setFriends(name) {
    finalIdea.push(name)
  }

  //Method 1 (Front end Based)
  //------------------------------------------------------------------------------//

  var isReady = false;

  useEffect(() => {
    if (isReady === false) {
      isReady = true;
      axios.get("/getFriendsNames", { params: { username: getUsername() } }).then((data) => { //Gets the users friends list
        //console.log("Length is: " + (data?.data.users[0].friends).length);
        for (var i = 0; i < (data?.data.users[0].friends).length; i++) {
          friendsNames.push(data?.data.users[0].friends[i]);
          console.log(("data.data " + data?.data.users[0].friends[i]));
        }
        console.log("Name 1 is : " + friendsNames[0]);


        console.log("Ty is cringe " + friendsNames.length);
        for (var j = 0; j < friendsNames.length; j++) {
          console.log("Ty is very cringe " + j);

          axios.get("/getUserEntry", { params: { username: friendsNames[j] } }).then((data) => { //gets the friends entry in User_Accounts
            console.log("i changed your gitlab profile again" + data?.data.singleFriend[0].username);
            friends.push(data?.data.singleFriend[0]);
            console.log("Running this code is: " + friends[0].username);
            console.log("AAAAND is... " + friends.length);

            console.log(friends.length, friendsNames.length);
            if (friends.length == friendsNames.length) {
              console.log("YEET")
              var data = friendsListDisplay();
              console.log("yeet: " + data);

              
              if (running2 === false) {
                running2 = true;
                document.getElementById("loadList").innerHTML = data;
                for (var i = 0; i < friendsNames.length; i++) {
                  var but = document.getElementById("Phil");
                  but.onclick= function(){pog()};
                }
              }


              var data2 = friendProfileDisplay();
              console.log("TOMISPOG");
              console.log("feat: " + data2);
              if (running3 === false) {
                running3 = true;
                document.getElementById("loadProfile").innerHTML = data2;
              }
            }
            console.log("selec2ded is:" + selec2ded);
            console.log("updated");
          });
        }
        console.log("SDVTEYHUIJXITY");
      });
    }
    //for (var z=0; z<storeFriendsNames.length; z++;){

    //console.log("SPRINTING");
    //}
  }, [getUsername()])



  /*
  for (var z=0; z++; z<storeFriendsNames.length){
    useEffect(() => {
      axios.get("/getUserEntry", { params: { username: storeFriendsNames[0] } }).then((data) => {
        setFriendsAdded(data?.data.friendList);
          });
    }, [storeFriendsNames[0]])
  }
  */
  //------------------------------------------------------------------------------//




  function friendsListDisplay() {
    if (running == false) {
      running = true;
      console.log(" Top of list display Len is... " + friends.length);
      console.log("The list has ");
      if (friends.length < 1) {
        var boi = "TmIsPog";
        console.log("boi" + boi);
        return '<button class="User-preview"> <BsPersonSquare class="Friend-picture" /><Col> <div class="Friend-username">Username</div> </Col> </button>';
      } else {
        return loadList();



      }
    }
  }




  function loadList() {
    
    var TOMISPOG = "";
    for (var i = 0; i < friends.length; i++) {
      TOMISPOG = TOMISPOG + '<button class="User-preview" id='+friends[i].username+'> <img class="Friend-picture" src=' + friends[i].profilePicture + ' alt="test image" /><Col><div class="Friend-username">' + friends[i].username + '</div></Col></button>';
    }
    return TOMISPOG;
  }









  function friendProfileDisplay() {
    if (friends.length < 1 || selec2ded === "") {
      return '<div><div class="Profile-details"><Row><Col><BsPersonSquare class="Profile-picture"/></Col><Col><div class="Profile-bio-container"><div class="Profile-bio">This is where my bio would be if I were your friend!</div></div></Col></Row><Row><Col><div class="Profile-username">Username</div></Col><Col><div class="Profile-section-header1">Favourite Draw</div></Col></Row><Row><Col><div class="Profile-stat-bar">Highest Streak: 0</div><div class="Profile-stat-bar">Average Rating: 0</div><div class="Profile-stat-bar">Total Stars Earned: 0</div><div class="Profile-stat-bar">Badges Unlocked: 0</div></Col><Col><BsFillTaxiFrontFill class="Profile-fav-draw"/></Col></Row><Row><Col><button class="Profile-unfriend-button-default" disabled={true}>Unfriend</button></Col><Col><button class="Profile-view-memories-default" disabled={true}>Memories</button></Col></Row></div></div>';
    } else {
      return loadProf();
    }
  }




  function loadProf(){
    var loadded = selec2ded;
    console.log("Loadded prints...: " + loadded.username);
    //console.log("Laod List: " + friends[0].profilePicture);
    var profile = '<div><div class="Profile-details"><Row><Col><img class="Profile-picture" src= ' + loadded.profilePicture + ' alt={"pfp image"} /></Col><Col><div class="Profile-bio-container"><div class="Profile-bio">'+ loadded.bio + '</div></div></Col></Row><Row><Col><div class="Profile-username">' + loadded.username + '</div></Col><Col><div class="Profile-section-header1">Favourite Draw</div></Col></Row><Row><Col><div class="Profile-stat-bar">Highest Streak: ' + loadded.maxSteak + '</div><div class="Profile-stat-bar">Average Rating:' + loadded.averageRating + '</div><div class="Profile-stat-bar">Total Stars Earned: ' + loadded.totalStars + '</div><div class="Profile-stat-bar">Badges Unlocked:  ' + loadded.badgesEarned + '</div></Col><Col><img class="Profile-fav-draw" src= ' + loadded.favouriteDraw + 'alt={"fav draw image"} /></Col></Row><Row><Col><button class="Profile-unfriend-button">Unfriend</button></Col><Col><button class="Profile-view-memories"><Link to={"/friends/memories/" + ' + loadded.id + '}>Memories</Link></button></Col></Row></div></div>'
    return profile;
  }









  return (
    <div className="Profiles-container">
      <Col className="Friend-side">
        <div className="Friends-title">Friends list</div>

        <div className="Friends-list" id={"loadList"}>
          {/*friendsListDisplay()*/}
        </div>
      </Col>

      <Col className="Profile-side">
        
        <div className="Details-to-fill" id={"loadProfile"}>
          {/*friendProfileDisplay()*/}
        </div>
      </Col>

    </div>
  );
}

export default FriendsList;
