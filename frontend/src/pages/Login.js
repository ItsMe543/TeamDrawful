import React, {Component} from "react";
import "../styles/SignUpAndLogIn.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PasswordInput from "./PasswordInput";

//<div className="info-label">Password</div>
//<input className="info-box" type="text" placeholder="Password" />


function Login() {
  //<div style={{ fontSize: "50px", color: "white" }}>
  return (
    <div className="Background">
      <div className="accounts-page">
        <div className="account-details">
          <div className="title-text">
            Please Log in
          </div>

          <div className="details-segment">
              <div className="info-label">Username</div>
              <input id="user"  className="info-box" type="text" placeholder="Username" />
          </div>

          <div className="details-segment">
              <PasswordInput/>
          </div>

          <Link className="sign-up-link" to={"/signUp/"}>
            Create an account?
          </Link>

          <button className="submit-acc-details"
          onClick={() => {
              console.log(document.getElementById("user").value);
              document.cookie ="username ="+document.getElementById("user").value;
            }}>
              <Link to={"/home/"}>
              Log in
              </Link>
          </button>
        </div>
        <div className="disclaimer1">
          "Alpha Project Disclaimer This server is provided by the School of Computer Science at the University of Birmingham to allow users to provide feedback on software developed by students as part of an assignment. While we take reasonable precautions, we cannot guarantee the security of the data entered into the system. Do NOT enter any real personal data (e.g., financial information or otherwise) into the system. The assignment runs until May 31st 2023, at which time the server and all associated data will be destroyed."
        </div>
      </div>
    </div>
  );
}
export default Login;
