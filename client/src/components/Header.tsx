import React, {FC, ChangeEvent, useState} from 'react';

export default function Navbar() {
  return (
    <nav className="nav">
      <a href="/" className="site-title"> 
          <img src="/images/luminosity-home-logo.ico" alt="Home-logo"></img>
      </a>

      <ul>
        <li>
          <a href="/login">Log In</a>
        </li>
        <li>
          <a href="/register">Sign Up</a>
        </li>
      </ul>
    </nav>
  );
}
