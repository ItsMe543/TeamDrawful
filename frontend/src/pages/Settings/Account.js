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
    });

    useEffect(() => {
        axios.get("/api/user_accounts/1/").then((data) => {
            console.log(data);
            setPost(data?.data);
        });
    }, []);

    return (
        <div className="account-container" style={{ border: '1px solid white' }}>
            <Col style={{ border: '1px solid white' }}>
                <Row style={{ border: '1px solid white', border: '1px solid white' }}>
                    <Col md={2.5} style={{ paddingLeft: '30px', border: '1px solid white' }} >
                        <Link to="/memories">
                            <img src="/drawings/car.jpg" />
                        </Link>
                    </Col>
                    <Col style={{ paddingLeft: '30px', border: '1px solid white' }}>
                        <div style={{ fontSize: '44px', marginTop: '5px' }}>Account Settings</div>
                        <div style={{ color: 'grey', fontSize: '24px', marginTop: '-15px', marginLeft: '8px' }} className="sub">Edit your personal Settings</div>
                    </Col>
                </Row>
                <Row style={{ border: '1px solid white', border: '1px solid white' }}>
                    <Col md={3} style={{ border: '1px solid white' }}>
                        <div style={{ fontSize: '22px', paddingTop: '35px' }}>Name</div>
                        <div style={{ fontSize: '22px', paddingTop: '50px' }}>Username</div>
                        <div style={{ fontSize: '22px', paddingTop: '50px' }}>Email Address</div>
                        <div style={{ fontSize: '22px', paddingTop: '50px' }}>Bio</div>
                    </Col>
                    <Col style={{ border: '1px solid white' }}>
                        <div className="input">
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={post.name}
                            />
                        </div>
                        <div className="input">
                            <input
                                type="text"
                                placeholder="Enter your username"
                                value={post.username}
                            />
                        </div>
                        <div className="input" >
                            <input
                                style={{ color: 'rgb(146,146,146)' }}
                                type="text"
                                placeholder="Enter your email id"
                                value={post.email}
                                readOnly="true"
                            />
                        </div>
                        <div className="input">
                            <textarea
                                type="text"
                                placeholder="Max No. of Characters: 256s"
                                value={post.bio}
                            />
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col style={{ border: '1px solid white' }}>
                <div className="badges-header">Badges</div>
                <div className="badges-container"></div>

                <Row style={{ border: '1px solid white' }}>
                    {/* <Col md="3" style={{ border: '1px solid white' }}>
                        <button>Save Changes</button>
    </Col>*/}
                    <Col style={{ border: '1px solid white' }}>
                        <div className="stats-header">Stats</div>
                        <div className="stats">
                            <div>Highest Streak: </div>
                            <div>Average Rating: </div>
                            <div>Total Stars Earned: </div>
                            <div>Badges Unlocked: </div>
                        </div>
                    </Col>

                </Row>
            </Col>
        </div>
    );
}
