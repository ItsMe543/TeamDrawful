import React from "react";
import { useState } from "react";

//export default PasswordTextBox;

export default function PasswordInput(){
    const[password, setPassword] = useState("");
    const[visible, setVisible] = useState(false);

    return(
        <div>
        <form>
            <label htmlFor="password" className="info-label">
            Password
            </label>
            <div className="info-box">
            <input value={password} type={visible ? "text" : "password"} id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="blay">
            </input>
            </div>
        </form>
        </div>
    )
}