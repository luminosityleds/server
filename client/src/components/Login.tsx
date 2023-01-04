import React, { FC } from 'react';
import "../css/App.css"
import {Users} from "../Interfaces"
import {Link} from 'react-router-dom'
import {AppleLogin, GoogleLogin, MicrosoftLogin, GitHubLogin} from "./ThirdParty";
import { GoogleOAuthProvider } from "@react-oauth/google"

export const Login: FC<Users> = (props: Users) => {
  return (
    <div className="login-cover">
      <h1>Login</h1>
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
      <div className="sign-up-btn"><Link to="/register">Register Here</Link></div>
    </div>
  );
}

export default Login;