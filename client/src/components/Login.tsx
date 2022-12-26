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

export const Login: FC<Users> = (props: Users) => {
  const [usernameLogin, setUsernameLogin] = useState<string>("");
  function loginButtonClick () {
    console.log("You clicked me!");
    console.log(usernameLogin);
  }
  return (
    <div className="login-cover">
      <h1>Login</h1>
      <input type="username" placeholder="Username" 
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
          setUsernameLogin(e.target.value);
        }}
      />
      {usePasswordVisibility()}
      
      <div className="login-forgot-btns">
        <button className="login-btn" onClick={loginButtonClick}>Login</button>
        <div className="forgot-pwd-btn">Forgot Password</div>
      </div>
      <div className="sign-up-btn"><Link to="/register">Create New Account</Link></div>
    </div>
  );
}

export default Login;
