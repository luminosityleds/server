import React, { FC } from 'react';
import {useState} from "react";
import "../css/App.css"
import {Users} from "../Interfaces"
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

const eye = <FontAwesomeIcon icon={faEye} />
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />

function usePasswordVisibility(setPasswordLogin: Function){
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(passwordVisible ? false : true);
  }
  

  return(
    <>
      <input type={passwordVisible ? "text" : "password"} placeholder="Password" 
         onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
           setPasswordLogin(e.target.value);
         }}        
       />
      <i onClick={togglePasswordVisibility}>{passwordVisible ? eye : eyeSlash}</i>
    </>
  );
}

export const Login: FC<Users> = (props: Users) => {
  const [usernameLogin, setUsernameLogin] = useState<string>("");
  const [passwordLogin, setPasswordLogin] = useState<string>("");
  function loginButtonClick () {
    console.log("You clicked me!");
    console.log(usernameLogin);
    console.log(passwordLogin);
    
    axios.post("http://localhost:3000/login", {
      username: usernameLogin, 
      password: passwordLogin,
    }).then((res)=> {
      console.log(res);
    });
  };
  
  return (
    <div className="login-cover">
      <h1>Login</h1>
      <input type="username" placeholder="Username" 
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
          setUsernameLogin(e.target.value);
        }}
      />
      {usePasswordVisibility(setPasswordLogin)}
      
      <div className="login-forgot-btns">
        <button className="login-btn" onClick={loginButtonClick}>Login</button>
        <div className="forgot-pwd-btn">Forgot Password</div>
      </div>
      <div className="sign-up-btn"><Link to="/register">Create New Account</Link></div>
    </div>
  );
}

export default Login;
