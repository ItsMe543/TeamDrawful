import React from "react";
import { useState } from "react";

//export default PasswordTextBox;

export default function ConfirmPassword(){
    const[password, setPassword] = useState("");
    const[visible, setVisible] = useState(false);

    return(
        <div>
        <form>
            <label htmlFor="password" className="info-label">
            Confirm Password
            </label>
            <div className="infoP-box">
            <input value={password} type={visible ? "text" : "password"} id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="blay">
            </input>
            </div>
        </form>
        </div>
    )
}