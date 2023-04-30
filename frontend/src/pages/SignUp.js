import axios from "axios"; //Used for database interactivity
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/SignUpAndLogIn.css";

function SignUp() {
  //<div style={{ fontSize: "50px", color: "white" }}>
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cpVisible, setCPVisible] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const navigate = useNavigate();

  var x = 1;

  //const [checkIfExists, setCheckIfExists] = ({ key:values});

  //useEffect(() => {
  //axios.get("/api/User_Accounts/").then((checkIfExists) => {
  //setCheckIfExists(checkIfExists?.checkIfExists);
  //});
  //}, []);

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

  var isUsernameUnique = false;
  var isEmailUnique = false;

  const [fullname, setFullName] = useState("");
  const [accountHashedPass, setAccountHashedPass] = useState("");
  const [accountUserName, setAccountUsername] = useState("a");
  const [accountEmail, setAccountEmail] = useState("a");

  const sendNewDetails = (TOMISPOG) => {
    axios({
      method: "post",
      
      url: "/api/user_accounts/",
      data: {
        username: accountUserName,
        password: TOMISPOG,
        first_name: fullname.split(" ")[0],
        last_name: fullname.split(" ")[1],
        email: accountEmail,
        bio: "",
        badgesEarned: "00000000",
        averageRating: 0.0,
        currentStreak: 0,
        maxStreak: 0,
        totalStars: 0,
        friends: [],
        friendRequests: [],
      },
      headers: {
        "content-type": "application/json", 
        'X-CSRFToken':getCookie('csrftoken')
      },
    })
      .then((res) => {
        console.log("Sent: " + res);
        navigate('/login');
      })
      .catch((err) => console.log("Err: " + err));
  };

  const middleMan = (e) => {
    e.preventDefault();
    axios
      .get("/getUsernameCount", { params: { username: accountUserName } })
      .then(
        (data) => {
          isUsernameUnique = data.data === 0 ? true : false;
          middleMan2();
        },
        [accountUserName]
      );
  };

  const middleMan2 = () => {
    axios.get("/getEmailCount", { params: { email: accountEmail } }).then(
      (data) => {
        isEmailUnique = data.data === 0 ? true : false;
        checkUserDetails();
      },
      [accountEmail]
    );
  };

  // \s = space
  const checkUserDetails = () => {
    //Check fullname (at least 2 letters/spaces, no symbols or numbers)
    if (
      fullname.length < 1 ||
      fullname.match(/[0-9]/ || /[',./?@;:{}=+-_)(*&^%$£"!¬`¦\|><[]]/)
    ) {
      setErrormsg("You must provide a name with no symbols or numbers");
      return;
    }
    //console.log("You have a wonderful name :)");

    //check username (at least 8 characters, no duplicate usernames)
    if (accountUserName.length < 8) {
      setErrormsg("Username must be at least 8 characters long with no spaces");
      return;
    }

    //check email (Real email adress, no duplicate emails)
    if (
      accountEmail.length < 2 ||
      !accountEmail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ) {
      setErrormsg("Must be a valid email address");
      return;
    }

    //Check password (at least 8 characters, at least 1 number)
    if (password.length < 8) {
      setErrormsg("Password must be at least 8 characters long");
      return;
    }

    if (password != confirmPassword) {
      setErrormsg("Passwords do not match");
      return;
    }

    if (!isEmailUnique) {
      setErrormsg("This email is already linked to an account");
      return;
    }

    if (!isUsernameUnique) {
      setErrormsg("Username is already taken");
      return;
    }

    //If all checks are passed, send details to database
    setAccountHashedPass(password);
    sendNewDetails(password);
  };

  //<PasswordInput onChange={e => setAccountHashedPass(e.target.value)}/>

  return (
    <div className="page">
      <div className="accounts-page">
        <div className="account-details">
          <div className="title-text">Create an account</div>

          <div className="details-segment">
            <div className="info-label">Full Name</div>
            <input
              className="info-fullname-box"
              type="text"
              placeholder="Fullname"
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="details-segment">
            <div className="info-label">Username</div>
            <input
              className="info-username-box"
              type="text"
              placeholder="Username"
              onChange={(e) => setAccountUsername(e.target.value)}
            />
          </div>

          <div className="details-segment">
            <div className="info-label">Email</div>
            <input
              className="info-email-box"
              type="text"
              placeholder="ExampleUser@examplemail.co.uk"
              onChange={(e) => setAccountEmail(e.target.value)}
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

          <div className="details-segment">
            <form>
              <label htmlFor="password" className="infoP-label">
                Confirm Password
              </label>
              <div className="infoP-box">
                <input
                  value={confirmPassword}
                  type={cpVisible ? "text" : "password"}
                  id="passwordReEnter"
                  placeholder="Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="infoP-box"
                ></input>
              </div>
            </form>
          </div>

          <Link className="login-signup-switch" to={"/login/"}>
            Already got an account? Login
          </Link>

          <div className="error-msg">
            {errormsg}
          </div>

          <button className="submit-acc-details" onClick={middleMan}>
            Create account
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
export default SignUp;
