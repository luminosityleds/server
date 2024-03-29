import React, { FC } from 'react';
import "../css/App.css"
import {Users} from "../Interfaces"
import {Link} from 'react-router-dom'
import { GoogleRegister, MicrosoftRegister, GitHubRegister } from './ThirdParty';
import { GoogleOAuthProvider } from "@react-oauth/google"

export const Register: FC<Users> = (props: Users) => {
  return (
    <div className="register-cover">
        <h1>Register</h1>
        {/* Start of third party login buttons */}
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