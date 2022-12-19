import React, {FC, ChangeEvent, useState} from 'react';

export default function Navbar() {
  return (
    <nav className="nav">
      <a href="/" className="site-title">
        Luminosity LED
      </a>
      <div className="logo-container">
        <img src="/images/luminosity-led-logo.ico"></img>
      </div>
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
