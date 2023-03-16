import React, { useState } from "react";
import drawingData from "../../drawingData";
import "../../styles/Settings/Account.css";

export default function Account() {
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

    return (
        <div className="account-container">
            <div>
                <img src="/drawings/car.jpg" />
                <h1>
                    Account Settings
                    <div>Edit your personal Settings</div>
                </h1>
            </div>

            <div className="input">
                Name
                <input style={{ marginLeft: '122px' }}
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={handleNameChange}
                />
            </div>
            <div className="input">
                Username
                <input style={{ marginLeft: '98px' }}
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={handleUsernameChange}
                />
            </div>
            <div className="input">
                Email Address
                <input style={{ marginLeft: '71px', color: 'rgb(190,190,190)' }}
                    type="text"
                    placeholder="Enter your email id"
                    value={email}
                    onChange={handleEmailChange}
                    readOnly="true"
                />
            </div>
            <div className="input">
                <label>Bio</label>
                <textarea
                    type="text"
                    placeholder="Max No. of Characters: 256s"
                    value={bio}
                    onChange={handleBioChange}
                />
            </div>
        </div>
    );
}
