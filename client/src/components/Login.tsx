import React, { FC } from 'react';
import "../css/Login.css"
import {Users} from "../Interfaces"


export const Login: FC<Users> = (props: Users) => {
  return (
    <div className="login-cover">
        <h1>Login</h1>
        <input type="username" placeholder="username" />
        <input type="password" placeholder="password" />

        <div className="login-btn">Login</div>
        <div className="forgot-pwd-btn">Forgot Password</div>

    </div>
  );
}

export default Login;