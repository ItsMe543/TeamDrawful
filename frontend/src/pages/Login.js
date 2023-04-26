import React, { Component, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import "../styles/SignUpAndLogIn.css";
//<div className="info-label">Password</div>
//<input className="info-box" type="text" placeholder="Password" />

function Login() {
  //<div style={{ fontSize: "50px", color: "white" }}>
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  function checkCredentials() {
    sessionStorage.setItem("token", username);
    navigate("/home");
  }

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

          <button className="submit-acc-details" onClick={checkCredentials}>
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
