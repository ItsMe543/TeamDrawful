import React from "react";
import "../styles/SignUpAndLogIn.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import ConfirmPassword from "./ConfirmPassword"
import axios from "axios"; //Used for database interactivity
import { useEffect, useState } from "react";

function SignUp() {
  //<div style={{ fontSize: "50px", color: "white" }}>
  const [accountDetails, setAccountDetails] = useState({
    username: "",
    name: "",
    email: "",
    bio: "",
    badgesEarned: "",
    averageRating: 0.0,
    currentStreak: 0,
    maxStreak: 0,
    totalStars: 0,
    friends: {},
    friendRequests: {},
  })




  const setDetails = () => {
    setAccountDetails({
      username: fullname,
      name: accountUserName,
      email: accountEmail,
      bio: "",
      badgesEarned: "",
      averageRating: 0.0,
      currentStreak: 0,
      maxStreak: 0,
      totalStars: 0,
      friends: {},
      friendRequests: {},
    })
    sendNewDetails();
  }

  const [fullname, setFullName] = useState("");
  const [accountUserName, setAccountUsername] = useState({accountUserName: ""});
  const [accountEmail, setAccountEmail] = useState({accountEmail: ""});

  const sendNewDetails = () => {
    axios({
      method: 'post',
      url: '/api/user_accounts/',
      data: {
        username: fullname,
        name: accountUserName,
        email: accountEmail,
        bio: "",
        badgesEarned: "",
        averageRating: 0.0,
        currentStreak: 0,
        maxStreak: 0,
        totalStars: 0,
        friends: "",
        friendRequests: "",
      },
        headers: {
          "content-type": "application/json",
        }
      })
      .then((res) => console.log("Sent: " + res))
      .catch((err) => console.log("Err: " + err))
  }


  // \s = space
  const checkUserDetails = (e) => {
    e.preventDefault();
    //Check fullname (at least 2 letters/spaces, no symbols or numbers)
    if ((fullname.length) < 2 || fullname.match(/[0-9]/ || /[',./?@;:{}=+-_)(*&^%$£"!¬`¦\|><[]]/)){ //
      console.log("YOUR NAME IS BAD!");
      return;
    }
    //console.log("You have a wonderful name :)");

    //check username (at least 8 characters, no duplicate usernames)
    if ((accountUserName.length < 8)){
      console.log("Username NOT allowed");
      return;
    }

    //check email (Real email adress, no duplicate emails)
    if ((accountEmail.length < 1) || !(accountEmail.match(/[@]/))){
      console.log("No way thats a real email");
      return;
    }

    console.log("All good!");

    //Check password (at least 8 characters, at least 1 number)

    //If all checks are passed, send details to database 
    //setDetails();
  }
  
  return (
    <div className="page">
    <div className="accounts-page">
      <div className="account-details">
        <div className="title-text">
          Create an account
        </div>

        <div className="details-segment">
            <div className="info-label">Full Name</div>
            <input className="info-fullname-box" type="text" placeholder="Fullname" onChange={e => setFullName(e.target.value)}/>
        </div>

        <div className="details-segment">
            <div className="info-label">Username</div>
            <input className="info-username-box" type="text" placeholder="Username" onChange={e => setAccountUsername(e.target.value)}/>
        </div>

        <div className="details-segment">
            <div className="info-label">Email</div>
            <input className="info-email-box" type="text" placeholder="ExampleUser@examplemail.co.uk" onChange={e => setAccountEmail(e.target.value)}/>
        </div>

        <div className="details-segment">
          <PasswordInput/>
        </div>

        <div className="details-segment">
          <ConfirmPassword/>
        </div>

        <Link className="login-signup-switch" to={"/login/"}>
            Already got an account? Login
        </Link>

        <button className="submit-acc-details" onClick={checkUserDetails}>
          Create account
        </button>
      </div>
    </div>
    <div className="disclaimer1">
      "Alpha Project Disclaimer This server is provided by the School of Computer Science at the University of Birmingham to allow users to provide feedback on software developed by students as part of an assignment. While we take reasonable precautions, we cannot guarantee the security of the data entered into the system. Do NOT enter any real personal data (e.g., financial information or otherwise) into the system. The assignment runs until May 31st 2023, at which time the server and all associated data will be destroyed."
    </div>
  </div>
  );
}
export default SignUp;

