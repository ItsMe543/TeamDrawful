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

function Mutualusers() {

  const [selected, setSelected] = useState("");
  var selec2ded = "";
  
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


  //#########################################################################
  
  const allUsernames = [];
  const users = [];
  const finalIdea = []

  var skipSelf = false;

  var running2 = false;
  var running = false;
  var running3 = false;

  function pog(val){
    selec2ded = val;
    console.log(selec2ded);
    var data2 = friendProfileDisplay();
    document.getElementById("loaduserprofile").innerHTML = data2;
  }

  function setusers(name) {
    finalIdea.push(name)
  }


  var isReady = false;

  useEffect(() => {
    if (isReady === false) {
      isReady = true;
      axios.get("/api/user_accounts/").then((data) => { //Gets all users
        for (var i = 0; i < (data?.data).length; i++) {
          allUsernames.push(data?.data[i].username);
        }
        console.log("JOJO - HERE -> ALLUSERNAMES[0]: " + allUsernames[0]);

        for (var j = 0; j < allUsernames.length; j++) {
          axios.get("/getUserEntry", { params: { username: allUsernames[j] } }).then((data) => { //gets the users entry in User_Accounts
            users.push(data?.data.singleFriend[0]);
            console.log("Running this code is: " + users[0].username);
            console.log("AAAAND is... " + users.length);

            console.log(users.length, allUsernames.length);
            if (users.length == allUsernames.length) {
              //console.log("YEET")
              var data = usersListDisplay();
              //console.log("yeet: " + data);

              
              if (running2 === false) {
                running2 = true;
                document.getElementById("loaduserlist").innerHTML = data;
                for (var i = 0; i < allUsernames.length; i++) {
                  var but = document.getElementById(allUsernames[i]);
                  but.onclick= function(){pog(this.id)};
                }
              }


              var data2 = friendProfileDisplay();
              console.log("TOMISPOG");
              console.log("feat: " + data2);
              if (running3 === false) {
                running3 = true;
                document.getElementById("loaduserprofile").innerHTML = data2;
              }
            }
            console.log("selec2ded is:" + selec2ded);
            console.log("updated");
          });
        }
        console.log("SDVTEYHUIJXITY");
      });
    }
    //for (var z=0; z<storeallUsernames.length; z++;){

    //console.log("SPRINTING");
    //}
  }, [getUsername()])


  function usersListDisplay() {
    if (running == false) {
      running = true;
      console.log(" Top of list display Len is... " + users.length);
      console.log("The list has ");
      if (users.length < 1) {
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
    for (var i = 0; i < users.length; i++) {
      if (users[i].username != getUsername()){
      TOMISPOG = TOMISPOG + '<button class="User-preview" id='+users[i].username+'> <img class="Friend-picture" src=' + users[i].profilePicture + ' alt="test image" /><Col><div class="Friend-username">' + users[i].username + '</div></Col></button>';
     } else{
      TOMISPOG = TOMISPOG;
     }
    }
    return TOMISPOG;
  }


  function friendProfileDisplay() {
    if (users.length < 1 || selec2ded === "") {
      return '<div><div class="Profile-details"><Row><Col><BsPersonSquare class="Profile-picture"/></Col><Col><div class="Profile-bio-container"><div class="Profile-bio">This is where my bio would be if I were your friend!</div></div></Col></Row><Row><Col><div class="Profile-username">Username</div></Col><Col><div class="Profile-section-header1">Favourite Draw</div></Col></Row><Row><Col><div class="Profile-stat-bar">Highest Streak: 0</div><div class="Profile-stat-bar">Average Rating: 0</div><div class="Profile-stat-bar">Total Stars Earned: 0</div><div class="Profile-stat-bar">Badges Unlocked: 0</div></Col><Col><BsFillTaxiFrontFill class="Profile-fav-draw"/></Col></Row><Row><Col><button class="Profile-unfriend-button-default" disabled={true}>Unfriend</button></Col><Col><button class="Profile-view-memories-default" disabled={true}>Befriend</button></Col></Row></div></div>';
    } else {
      return loadProf();
    }
  }


  function loadProf(){
    var loadded = selec2ded;
    for (var j = 0; j < users.length; j++) {
      if (loadded === users[j].username){
        console.log("Loadded prints...: " + users[j].username);
        //console.log("Laod List: " + users[0].profilePicture);
        var profile = '<div><div class="Profile-details"><Row><Col><img class="Profile-picture" src= ' + users[j].profilePicture + ' alt={"pfp image"} /></Col><Col><div class="Profile-bio-container"><div class="Profile-bio">'+ users[j].bio + '</div></div></Col></Row><Row><Col><div class="Profile-username">' + users[j].username + '</div></Col><Col><div class="Profile-section-header1">Favourite Draw</div></Col></Row><Row><Col><div class="Profile-stat-bar">Highest Streak: ' + users[j].maxSteak + '</div><div class="Profile-stat-bar">Average Rating:' + users[j].averageRating + '</div><div class="Profile-stat-bar">Total Stars Earned: ' + users[j].totalStars + '</div><div class="Profile-stat-bar">Badges Unlocked:  ' + users[j].badgesEarned + '</div></Col><Col><img class="Profile-fav-draw" src= ' + users[j].favouriteDraw + 'alt={"fav draw image"} /></Col></Row><Row><Col><button class="Profile-unfriend-mf-button">Unfriend</button></Col><Col><button class="Profile-befriend-button">Befriend</button></Col></Row></div></div>'
      }
    }
    return profile;
  }


  return (
    <div className="Profiles-container">
      <Col className="Friend-m-side">
        <div className="Mutual-title">Find users</div>
          
          <div className="Friends-list" id="loaduserlist">
            {/*displayAllUsers()*/}
          </div>
      </Col>


      <Col className="Profile-side">
        <div className="Details-to-fill" id= "loaduserprofile">
          {/*displayUserProfile()*/}
        </div>
      </Col>

    </div>
  );
}
        
export default Mutualusers;