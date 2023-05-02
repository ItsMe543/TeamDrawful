import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import "../../styles/Settings/Account.css";

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === name + "=") {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export default function Account() {
    var isUsernameUnique = false;
    var isEmailUnique = false;

    const [errormsg, setErrormsg] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [newUsername, setNewUsername] = useState(username);
    const [profilePicture, setProfilePicture] = useState("");
    const [currentStreak, setCurrentStreak] = useState("");
    const [maxStreak, setMaxStreak] = useState("");
    const [totalStars, setTotalStars] = useState("");
    const [averageRating, setAverageRating] = useState("");

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            axios
                .get(`/userProfile?username=${token}`)
                .then((response) => {
                    const data = response?.data?.User[0];
                    setName(data?.first_name + " " + data?.last_name);
                    setUsername(data?.username);
                    setEmail(data?.email);
                    setBio(data?.bio);
                    setProfilePicture(data?.profilePicture);
                    setCurrentStreak(data?.currentStreak);
                    setMaxStreak(data?.maxStreak);
                    setTotalStars(data?.totalStars);
                    setAverageRating(data?.averageRating);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    const middleMan = (e) => {
        e.preventDefault();
        if (newUsername === '') {
            middleMan1(e);
        }
        else {
            axios.get("/getUsernameCount", { params: { username: newUsername } }).then(
                (data) => {
                    isUsernameUnique = data.data === 0 ? true : false;
                    middleMan2();
                },
                [newUsername]
            );
        };
    };

    const middleMan1 = (e) => {
        e.preventDefault();
        axios.get("/getUsernameCount", { params: { username: username } }).then(
            (data) => {
                isUsernameUnique = data.data === 1 ? true : false;
                middleMan2();
            },
            [newUsername]
        );
    };


    const middleMan2 = () => {
        axios.get("/getEmailCount", { params: { email: email } }).then(
            (data) => {
                isEmailUnique = data.data === 1 || data.data === 0 ? true : false;
                checkUserDetails();
            },
            [email]
        );
    };

    const handleSave = () => {
        const authToken = sessionStorage.getItem("token");
        if (authToken) {
            const csrftoken = getCookie("csrftoken");

            axios({
                method: "put",
                url: `/updateProfile?username=${username}`,
                headers: {
                    "X-CSRFToken": csrftoken,
                    "Content-Type": "application/json",
                },
                data: {
                    username: newUsername || username,
                    email: email,
                    first_name: name.split(" ")[0],
                    last_name: name.split(" ")[1],
                    bio: bio,
                    currentStreak: currentStreak,
                    maxStreak: maxStreak,
                    totalStars: totalStars,
                    averageRating: averageRating,
                },
            })
                .then((response) => {
                    console.log(response.data);
                    sessionStorage.setItem("token", newUsername || username);
                    document.cookie = "username=" + (newUsername || username);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const checkUserDetails = (e) => {
        //Check fullname (at least 2 letters/spaces, no symbols or numbers)
        if (
            name.length < 1 ||
            name.match(/[0-9]/ || /[',./?@;:{}=+-_)(*&^%$£"!¬`¦\|><[]]/)
        ) {
            setErrormsg("You must provide a name with no symbols or numbers");
            return;
        }

        //check username (at least 8 characters, no duplicate usernames)
        if (username && username.length < 8) {
            setErrormsg("Username must be at least 8 characters long with no spaces");
            return;
        }

        if (newUsername && newUsername.length < 8) {
            setErrormsg("New username must be at least 8 characters long with no spaces");
            return;
        }

        //check email (Real email adress, no duplicate emails)
        if (
            email.length < 2 ||
            !email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        ) {
            setErrormsg("Must be a valid email address");
            return;
        }

        //check bio (no more than 200 characters)
        if (bio && bio.length > 200) {
            return;
        }
        {
            if (!isEmailUnique) {
                setErrormsg("This email is already linked to an account");
                return;
            }

            if (!isUsernameUnique) {
                setErrormsg("Username is already taken");
                return;
            }
        }

        handleSave();
        setErrormsg("Changes Saved");
    };

    return (
        <div className="account-container">
            <Col>
                <Row>
                    <Col md={2.5} style={{ paddingLeft: "30px" }}>
                        <Link to="/memories" aria-label="Profile Picture, link to memories">
                            <img src={profilePicture} alt={"drawing image"} />
                        </Link>
                    </Col>
                    <Col style={{ paddingLeft: "30px" }}>
                        <div className="account-header">Account Settings</div>
                        <div className="sub">Edit your personal Settings</div>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <div className="labels">Name</div>
                        <div className="labels">Username</div>
                        <div className="labels">Email Address</div>
                        <div className="labels">Bio</div>
                    </Col>
                    <Col>
                        <div className="input">
                            <input
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="input">
                            <input
                                placeholder="Enter your username"
                                value={newUsername || username}
                                onChange={(e) => setNewUsername(e.target.value)}
                            />
                        </div>
                        <div className="input">
                            <input style={{ color: "rgb(120,120,120)" }}
                                placeholder="email id"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                readOnly="true"
                            />
                        </div>
                        <div className="input">
                            <textarea
                                className="textarea"
                                placeholder="Max No. of Characters: 256s"
                                value={bio}
                                style={{ resize: "none" }}
                                onChange={(e) => setBio(e.target.value)}
                            />
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col>
                <div className="badges-header">Badges</div>
                <div className="badges-container"></div>

                <Row>
                    <Col md={"2.5"}>
                        <div className="stats-header">Stats</div>
                        <div className="stats">
                            <div>Current Streak: {currentStreak}</div>
                            <div>Highest Streak: {maxStreak} </div>
                            <div>Average Rating: {averageRating}</div>
                            <div>Total Stars Earned: {totalStars} </div>
                        </div>
                    </Col>
                    <Col>
                        <button className="save" onClick={middleMan}>
                            Save Changes
                        </button>
                        <div
                            className="error-msg"
                            style={{ marginLeft: "30px", marginTop: "25px" }}
                        >
                            {errormsg}
                        </div>
                    </Col>
                </Row>
            </Col>
        </div>
    );
}
