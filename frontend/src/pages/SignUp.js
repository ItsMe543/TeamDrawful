import React from "react";
import "../styles/SignUpANDLogIn.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function SignUp() {
  //<div style={{ fontSize: "50px", color: "white" }}>
  return (
    <div className="accounts-page">
      <div className="account-details">
        <div className="title-text">
          Create an account
        </div>

        <div className="details-segment">
            <div className="info-label">Full Name</div>
            <input className="info-box" type="text" placeholder="Fullname" />
        </div>

        <div className="details-segment">
            <div className="info-label">Username</div>
            <input className="info-box" type="text" placeholder="Username" />
        </div>

        <div className="details-segment">
            <div className="info-label">Email</div>
            <input className="info-box" type="text" placeholder="Email" />
        </div>

        <div className="details-segment">
            <div className="info-label">Password</div>
            <input className="info-box" type="text" placeholder="Password" />
        </div>

        <div className="details-segment">
            <div className="info-label">Confirm Password</div>
            <input className="info-box" type="text" placeholder="Password" />
        </div>

        <Link className="login-signup-switch" to={"/login/"}>
            Already got an account? Login
        </Link>

        <button className="submit-acc-details">
          <Link to={"/login/"}>
            Create account
          </Link>
        </button>
      </div>
      <div className="disclaimer1">
        "Alpha Project Disclaimer This server is provided by the School of Computer Science at the University of Birmingham to allow users to provide feedback on software developed by students as part of an assignment. While we take reasonable precautions, we cannot guarantee the security of the data entered into the system. Do NOT enter any real personal data (e.g., financial information or otherwise) into the system. The assignment runs until May 31st 2023, at which time the server and all associated data will be destroyed."
      </div>
    </div>
  );
}
export default SignUp;