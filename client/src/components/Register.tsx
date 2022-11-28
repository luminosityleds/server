import React, { FC } from 'react';
import "../css/Register.css"
import {Users} from "../Interfaces"

export const Register: FC<Users> = (props: Users) => {
  return (
    <div className="register-cover">
        <h1>Register</h1>
        <input type="username" placeholder="username" />
        <input type="password" placeholder="password" />

        <div className="sign-up-btn">Sign Up</div>
        <div className="spacer">Spacer</div>
    </div>
  );
}

export default Register;