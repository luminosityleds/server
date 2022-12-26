import React, {FC, ChangeEvent, useState} from 'react';
import {Link} from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="nav">
      <a href="/" className="site-title"> 
          <img src="/images/luminosity-home-logo.ico" alt="Home-logo"></img>
      </a>

      <ul>
        <li>
          <Link to="/login">Log In</Link>
        </li>
        <li>
          <Link to="/register">Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
}
