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
    profilePicture: "",
    favouriteDraw: "",
    badgesEarned: "",
    averageRating: 0.0,
    currentStreak: 0,
    maxStreak: 0,
    totalStars: 0,
    totalStars: 0,
    friends: {},
    friendRequests: {},
  })

  const setNewDetails = (e) =>{
    e.preventDefault();
    setAccountDetails({
      username: e.target.value,
      name: e.target.value,
      email: e.target.value,
      bio: "",
      profilePicture: "",
      favouriteDraw: "",
      badgesEarned: "",
      averageRating: 0.0,
      currentStreak: 0,
      maxStreak: 0,
      totalStars: 0,
      totalStars: 0,
      friends: {},
      friendRequests: {},
    })
  }

  const sendNewDetails = (e) => {
    e.preventDefault();
    axios
      .post("/api/User_Accounts", {accountDetails})
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
            <input className="info-fullname-box" type="text" placeholder="Fullname" />
        </div>

        <div className="details-segment">
            <div className="info-label">Username</div>
            <input className="info-username-box" type="text" placeholder="Username" />
        </div>

        <div className="details-segment">
            <div className="info-label">Email</div>
            <input className="info-email-box" type="text" placeholder="ExampleUser@examplemail.co.uk" />
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

        <button className="submit-acc-details">
          <Link onClick={setNewDetails} to={"/login/"}>
            Create account
          </Link>
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

