import React, { FC } from 'react';
import {useState} from "react";
import "../css/Login.css"
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
      <input type={passwordVisible ? "text" : "password"} placeholder="password" />
      <i onClick={togglePasswordVisibility}>{passwordVisible ? eye : eyeSlash}</i>
    </>
  );
}



export const Login: FC<Users> = (props: Users) => {
  return (
    <div className="login-cover">
      <h1>Login</h1>
      <input type="username" placeholder="username" />
      {usePasswordVisibility()}
      
      <div className="login-btn">Login</div>
      <div className="forgot-pwd-btn">Forgot Password</div>
      <div className="sign-up-btn"><Link to="/register">Create New Account</Link></div>
    </div>
  );
}

export default Login;