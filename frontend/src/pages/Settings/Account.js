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
        const username = "DrawingGod69";
        axios.get(`/api/user_accounts/${username}/`).then((data) => {
            console.log(data);
            setPost(data?.data);
        });
    }, []);

    function deleteAccount() {
        const username = "DrawingGod69";
        axios.delete(`/api/user_accounts/${username}/`)
            .then(response => {
                console.log(response);

            })
            .catch(error => {
                console.log(error);

            });
    }

    return (
        <div className="account-container">
            <Col>
                <Row>
                    <Col md={2.5} style={{ paddingLeft: '30px' }} >
                        <Link to="/memories">
                            <img src="/drawings/car.jpg" />
                        </Link>
                    </Col>
                    <Col style={{ paddingLeft: '30px' }}>
                        <div className="account-header" >Account Settings</div>
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
                    <Col >
                        <div className="input">
                            <input

                                placeholder="Enter your name"
                                value={post.name}
                            />
                        </div>
                        <div className="input">
                            <input

                                placeholder="Enter your username"
                                value={post.username}
                            />
                        </div>
                        <div className="input" >
                            <input
                                style={{ color: 'rgb(146,146,146)' }}

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
                            />
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col>
                <div className="badges-header">Badges</div>
                <div className="badges-container"></div>

                <Row>
                    {/* <Col md="3" style={{ border: '1px solid white' }}>
                        <button>Save Changes</button>
    </Col>*/}
                    <Col>
                        <div className="stats-header">Stats</div>
                        <div className="stats">
                            <div>Highest Streak: {post.maxStreak} </div>
                            <div>Average Rating: {post.averageRating}</div>
                            <div>Total Stars Earned: {post.totalStars} </div>
                            <div>Badges Unlocked: {post.badgesEarned}</div>
                            <button onClick={deleteAccount}>Temporary Delete</button>
                        </div>
                    </Col>

                </Row>
            </Col>
        </div>
    );
}
