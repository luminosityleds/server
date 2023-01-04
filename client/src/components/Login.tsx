import React, { FC } from 'react';
import {useState} from "react";
import "../css/App.css"
import "../css/ThirdParty.css"
import {Users} from "../Interfaces"
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {AppleLogin, GoogleLogin, MicrosoftLogin, GitHubLogin} from "./ThirdParty";
import { GoogleOAuthProvider } from "@react-oauth/google"

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
  return (
    <div className="login-cover">
      <h1>Login</h1>
      <input type="username" placeholder="Username" />
      {usePasswordVisibility()}
      
      <div className="login-forgot-btns">
        <div className="login-btn">Login</div>
        <div className="forgot-pwd-btn">Forgot Password</div>
      </div>
      {/* Start of third party login buttons */}
      <div className="third-party-btns">
        <div><AppleLogin /></div>
      </div>
      <div className="third-party-btns">
        <GoogleOAuthProvider clientId="281168454695-kvsbsq9sp4gtap61erk0mhe53bgddgfl.apps.googleusercontent.com">
          <GoogleLogin />
        </GoogleOAuthProvider>
      </div>
      <div className="third-party-btns">
        <div><MicrosoftLogin /></div>
      </div>
      <div className="third-party-btns">
        <div><GitHubLogin /></div>
      </div>
      {/* End of third party login buttons */}
      <div className="sign-up-btn"><Link to="/register">Register</Link></div>
    </div>
  );
}

export default Login;