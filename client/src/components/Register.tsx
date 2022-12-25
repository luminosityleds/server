import React, { FC } from 'react';
import {useState} from "react";
import "../css/App.css"
import {Users} from "../Interfaces"
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import { AppleRegister, GoogleRegister, MicrosoftRegister, GitHubRegister } from './ThirdParty';
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

export const Register: FC<Users> = (props: Users) => {
  return (
    <div className="register-cover">
        <h1>Register</h1>
        <input type="username" placeholder="Username" />
        {usePasswordVisibility()}

        <div className="sign-up-btn">Sign Up</div>
        {/* Start of third party login buttons */}
      <div className="third-party-btns">
        <div><AppleRegister /></div>
      </div>
      <div className="third-party-btns">
      <GoogleOAuthProvider clientId="281168454695-kvsbsq9sp4gtap61erk0mhe53bgddgfl.apps.googleusercontent.com">
        <GoogleRegister />
        </GoogleOAuthProvider>
      </div>
      <div className="third-party-btns">
        <div><MicrosoftRegister /></div>
      </div>
      <div className="third-party-btns">
        <div><GitHubRegister /></div>
      </div>
      {/* End of third party login buttons */}
        <div className="login-btn"><Link to="/login">Login Here</Link></div>
    </div>
  );
}

export default Register;