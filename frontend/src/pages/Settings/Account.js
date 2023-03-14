import React from "react";
import drawings from "../../drawingData";
import "../../styles/Settings/Account.css";
export default function Account() {
    return (
        <div className="account-container" style={{ paddingLeft: "250px", paddingTop: '25px' }}>
            <div><img src="/drawings/car.jpg" style={{ width: '150px', marginLeft: '40px' }} />
                <div style={{ fontSize: '50px', position: 'absolute', left: '470px', top: '170px', marginLeft: '50px', paddingTop: '20px' }}>Account Settings<br></br>
                    <div style={{ fontSize: '28px', color: 'rgb(150,150,150)', position: 'relative', bottom: '20px', left: '7px' }}>Edit your personal Settings</div>
                </div></div>



            <div className="input">Name
                <input style={{ backgroundColor: "rgb(57,59,61)", marginLeft: '120px', width: '320px', color: 'white', marginTop: '20px' }} type="text" placeholder="   Enter your name" />
            </div>
            <div className="input">Username
                <input style={{ backgroundColor: "rgb(57,59,61)", marginLeft: '96px', width: '320px', color: 'white' }} type="text" placeholder="   Enter your username" />
            </div>
            <div className="input">Email Address
                <input style={{ backgroundColor: "rgb(57,59,61)", marginLeft: '67px', width: '320px', color: 'white' }} type="text" placeholder="   Enter your email id" />
            </div>
            <div className="input">Bio
                <input style={{ backgroundColor: "rgb(57,59,61)", marginLeft: '142px', width: '320px', color: 'white', height: '200px' }} type="text" placeholder="   Max No. of Characters: 256s" />
            </div>
        </div>

    )

}