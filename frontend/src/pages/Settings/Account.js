import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import "../../styles/Settings/Account.css";

export default function Account() {
    const [post, setPost] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        bio: "",
        badgesEarned: "",
        maxStreak: "",
        totalStars: "",
        averageRating: "",
    });

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");

    useEffect(() => {
        axios.get(`/api/user_accounts/1/`).then((data) => {
            console.log(data);
            setPost(data?.data);
            setName(data?.data.first_name + " " + data?.data.last_name);
            setUsername(data?.data.username);
            setEmail(data?.data.email);
            setBio(data?.data.bio);
        });
    }, []);

    const handleSave = () => {
        axios
            .put(`/api/user_accounts/1/`, {
                username: username,
                email: email,
                first_name: name.split(' ')[0],
                last_name: name.split(' ')[1],
                bio: bio,
                badgesEarned: post.badgesEarned,
                maxStreak: post.maxStreak,
                totalStars: post.totalStars,
                averageRating: post.averageRating,
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //temporary
    const [data, setData] = useState({
        drawing: null
    })

    //temporary
    useEffect(() => {
        axios.get(`/api/user_memories/1/`).then((data) => {
            console.log(data);
            setData(data?.data);
        });
    }, []);

    const checkUserDetails = (e) => {
        e.preventDefault();
        //Check fullname (at least 2 letters/spaces, no symbols or numbers)
        if ((name.length) < 1 || name.match(/[0-9]/ || /[',./?@;:{}=+-_)(*&^%$£"!¬`¦\|><[]]/)) {
            return;
        }

        //check username (at least 8 characters, no duplicate usernames)
        if ((username.length < 8)) {
            return;
        }

        //check bio (no more than 200 characters)
        if ((bio.length > 200)) {
            return;
        }

        handleSave();
    }

    return (
        <div className="account-container">
            <Col>
                <Row>
                    <Col md={2.5} style={{ paddingLeft: "30px" }}>
                        <Link to="/memories" aria-label="Profile Picture, link to memories">
                            <img src={data.drawing} alt={"drawing image"} />
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
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="input">
                            <input className="email"
                                style={{ color: "rgb(120,120,120)" }}
                                placeholder="email id"
                                value={email}
                                readOnly="true"
                            />
                        </div>
                        <div className="input">
                            <textarea className="textarea"
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
                            <div>Highest Streak: {post.maxStreak} </div>
                            <div>Average Rating: {post.averageRating}</div>
                            <div>Total Stars Earned: {post.totalStars} </div>
                            <div>Badges Unlocked: {post.badgesEarned}</div>


                        </div>
                    </Col>
                    <Col>
                        <button className="save" onClick={checkUserDetails}>Save Changes</button>
                    </Col>

                </Row>
            </Col>
        </div>
    );
}
