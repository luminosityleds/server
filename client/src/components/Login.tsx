import React, { FC } from 'react';
import "../css/Login.css"
import {Users} from "../Interfaces"
import {Link} from 'react-router-dom'


export const Login: FC<Users> = (props: Users) => {
  return (
    <div className="login-cover">
        <h1>Login</h1>
        <input type="username" placeholder="username" />
        <input type="password" placeholder="password" />

        <div className="login-btn">Login</div>
        <div className="forgot-pwd-btn">Forgot Password</div>
        <div className="sign-up-btn"><Link to="/register">Create New Account</Link></div>

    </div>
  );
}

export default Login;