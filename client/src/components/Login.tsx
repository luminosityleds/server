import React, { FC } from 'react';
import "../css/App.css"
import {Users} from "../Interfaces"
import {Link} from 'react-router-dom'
import { GoogleLogin, MicrosoftLogin, GitHubLogin} from "./ThirdParty";
import { GoogleOAuthProvider } from "@react-oauth/google"

export const Login: FC<Users> = (props: Users) => {
  return (
    <div className="login-cover">
      <h1>Login</h1>
      {/* Start of third party login buttons */}
      <div className="third-party-btns">
        <GoogleOAuthProvider clientId="337166284035-e9g7u5rcp0fam8o2bbrcj2o8nct3tabb.apps.googleusercontent.com">
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