import React from "react";
import { useEffect, useRef, useState } from "react";
import drawingData from "../../drawingData";
import "../../styles/Settings/Account.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Account() {
    const [post, setPost] = useState({
        username: "",
        email: "",
        name: "",
        bio: "",
    });
    const [name, setName] = useState(drawingData[0].name);
    const [username, setUsername] = useState(drawingData[0].username);
    const [email, setEmail] = useState(drawingData[0].email);
    const [bio, setBio] = useState(drawingData[0].bio);

    const handleNameChange = (event) => {
        setName(event.target.value);
        drawingData[0].name = event.target.value;
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        drawingData[0].username = event.target.value;
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        drawingData[0].email = event.target.value;
    };

    const handleBioChange = (event) => {
        setBio(event.target.value);
        drawingData[0].bio = event.target.value;
    };

    useEffect(() => {
        axios.get("/api/user_accounts/1/").then((data) => {
            console.log(data);
            setPost(data?.data);
        });
    }, []);

    return (
        <div className="account-container">
            <div>
                <Link to="/memories">
                    <img src="/drawings/car.jpg" />
                </Link>
                <h1>
                    Account Settings
                    <div className="sub">Edit your personal Settings</div>
                </h1>
            </div>

            <div className="input">
                <label>Name</label>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={post.name}
                    onChange={handleNameChange}
                />
            </div>

            <div className="input">
                <label>Username</label>
                <input
                    type="text"
                    placeholder="Enter your username"
                    value={post.username}
                    onChange={handleUsernameChange}
                />
            </div>
            <div className="input" >
                <label>Email Address</label>
                <input style={{ color: 'rgb(146,146,146)' }}
                    type="text"
                    placeholder="Enter your email id"
                    value={post.email}
                    onChange={handleEmailChange}
                    readOnly="true"
                />
            </div>
            <div className="input">
                <label>Bio</label>
                <textarea
                    type="text"
                    placeholder="Max No. of Characters: 256s"
                    value={post.bio}
                    onChange={handleBioChange}
                />
            </div>
            <div className="badges-header">Badges</div>
            <div className="badges-container">

            </div>
            <div className="stats">
                <div style={{ fontSize: '30px', marginBottom: '6px' }}>Stats</div>
                <div>Highest Streak: </div>
                <div>Average Rating: </div>
                <div>Total Stars Earned: </div>
                <div>Badges Unlocked: </div>
            </div>

        </div>
    );
}
