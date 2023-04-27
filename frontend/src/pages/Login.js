import React, { Component, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

import "../styles/SignUpAndLogIn.css";
//<div className="info-label">Password</div>
//<input className="info-box" type="text" placeholder="Password" />

function Login() {
  //<div style={{ fontSize: "50px", color: "white" }}>
  const[username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const navigate = useNavigate();

  var isCorrectCredentials = false;

  const middleMan = () => {
    axios.get("/authenticateUser", { params: { username: username, password: password} }).then((data) => {
      isCorrectCredentials = ((data.data === 1) ? true : false);
      if (!isCorrectCredentials) {
        setErrormsg("Incorrect details. Please try again");
      } else {
        logUserIn();
      }
    }, [username, password]);
  }

  function checkCredentials(e) {
    e.preventDefault();

    if (username.length === 0) {
      setErrormsg("Please enter a username");
      return;
    }

    if (password.length === 0) {
      setErrormsg("Please enter your password");
      return;
    }

    middleMan();

    sessionStorage.setItem("token", username);
    document.cookie = "username =" + username;
  }

  function logUserIn() {
    navigate("/home");
  }

  //Attempt to allow enter to work:
  useEffect(() => {
    var passInput = document.getElementById("user");
    passInput.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("submitButton").click();
      }
    });
  });

  return (
    <div className="page">
      <div className="accounts-page">
        <div className="account-details">
          <div className="title-text">Log in</div>

          <div className="details-segment">
            <div className="info-label">Username</div>
            <input
              id="user"
              className="info-box"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="details-segment">
            <form>
              <label htmlFor="password" className="infoP-label">
                Password
              </label>
              <div className="infoP-box">
                <input
                  value={password}
                  type={visible ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="infoP-box"
                ></input>
              </div>
            </form>
          </div>

          <Link className="sign-up-link" to={"/signUp/"}>
            Create an account?
          </Link>

          <div className="error-msg">
            {errormsg}
          </div>

          <button className="submit-acc-details" id="submitButton" onClick={checkCredentials}>
            Log in
          </button>
        </div>
      </div>
      <div className="disclaimer1">
        "Alpha Project Disclaimer This server is provided by the School of
        Computer Science at the University of Birmingham to allow users to
        provide feedback on software developed by students as part of an
        assignment. While we take reasonable precautions, we cannot guarantee
        the security of the data entered into the system. Do NOT enter any real
        personal data (e.g., financial information or otherwise) into the
        system. The assignment runs until May 31st 2023, at which time the
        server and all associated data will be destroyed."
      </div>
    </div>
  );
}
export default Login;
