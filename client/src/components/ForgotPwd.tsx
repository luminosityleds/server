import React, { FC } from 'react';
import {useState} from "react";
import "../css/App.css"
import {Users} from "../Interfaces"
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {faEyeSlash} from "@fortawesome/free-solid-svg-icons";

const eye = <FontAwesomeIcon icon={faEye} />
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />

function usePasswordVisibility(){
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
      setPasswordVisible(passwordVisible ? false : true);
    }
  
    return(
      <>
        <input type={passwordVisible ? "text" : "password"} placeholder="Password" />
        <i onClick={togglePasswordVisibility}>{passwordVisible ? eye : eyeSlash}</i>
      </>
    );
  }

export const ForgotPwd: FC<Users> = (props: Users) => {
    return (
        <div className="forgotpwd-cover">
        <h1>Forgot Password</h1>
        <input type="email" placeholder="Email" />

        <div className="login-btn"><Link to="/login">Login Here</Link></div>
    </div>
    );
  }

  export default ForgotPwd;