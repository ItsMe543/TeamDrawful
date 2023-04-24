import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import "../../styles/Settings/Account.css";

export default function Account() {
    const [post, setPost] = useState({
        username: "",
        email: "",
        name: "",
        bio: "",
        badgesEarned: "",
        maxStreak: "",
        totalStars: "",
        averageRating: "",
    });

    useEffect(() => {
        const email = "test";
        //axios.get(`/api/user_accounts/${email}/`).then((data) => {
        axios.get(`/api/user_accounts/1/`).then((data) => {
            console.log(data);
            setPost(data?.data);
        });
    }, []);

    function deleteAccount() {
        const email = "test";
        axios
            //.delete(`/api/user_accounts/${email}/`)
            .delete(`/api/user_accounts/1/`)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function updateAccount() {
        const email = "test";
        axios
            //.put(`/api/user_accounts/${email}/`, post)
            .put(`/api/user_accounts/1/`, post)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }



    return (
        <div className="account-container">
            <Col>
                <Row>
                    <Col md={2.5} style={{ paddingLeft: "30px" }}>
                        <Link to="/memories">
                            <img src="/drawings/car.jpg" alt="car" />
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
                                value={post.name}
                                onChange={(e) => setPost({ ...post, name: e.target.value })}
                            />
                        </div>
                        <div className="input">
                            <input
                                placeholder="Enter your username"
                                value={post.username}
                                onChange={(e) => setPost({ ...post, username: e.target.value })}
                            />
                        </div>
                        <div className="input">
                            <input
                                style={{ color: "rgb(146,146,146)" }}
                                placeholder="email id"
                                value={post.email}
                                readOnly="true"
                            />
                        </div>
                        <div className="input">
                            <textarea
                                placeholder="Max No. of Characters: 256s"
                                value={post.bio}
                                style={{ resize: "none" }}
                                maxLength={256}
                                onChange={(e) => setPost({ ...post, bio: e.target.value })}
                            />
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col>
                <div className="badges-header">Badges</div>
                <div className="badges-container"></div>

                <Row>
                    <Col>
                        <div className="stats-header">Stats</div>
                        <div className="stats">
                            <div>Highest Streak: {post.maxStreak} </div>
                            <div>Average Rating: {post.averageRating}</div>
                            <div>Total Stars Earned: {post.totalStars} </div>
                            <div>Badges Unlocked: {post.badgesEarned}</div>
                            {/*<button onClick={deleteAccount}>Delete Account</button>*/}
                            <button onClick={updateAccount}>Save Changes</button>

                        </div>
                    </Col>

                </Row>
            </Col>
        </div>
    );
}
