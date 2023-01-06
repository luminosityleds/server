import React, {FC, ChangeEvent, useState} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

function showUser() {
  const loggedIn = window.localStorage.getItem("isLoggedIn");
  const user = window.localStorage.getItem("userName")
  if (loggedIn === 'true') {
    return (
      <div className="loggedInNav">
        <ul>
          <li>Hello {user}</li>
        </ul>
      </div>
    )
  }
  else {
    return (
    <div className="loggedOutNav">
      <ul>
        <li><Link to="/login">Log In</Link></li>
        <li><Link to="/register">Sign Up</Link></li>
      </ul>
    </div>
    )
  }
}

export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <nav className="nav">
      <a href="/" className="site-title"> 
          <img className="header_logo_long" src="/images/luminosity-home-logo.ico" alt="Home-logo"></img>
      </a>
      <ul>
        {showUser()}
        <div className="nav_triple_bar_menu">
          <div className="nav_triple_bar_icon">
            {toggleMenu 
              ? <FontAwesomeIcon icon={faBars} onClick={ () => setToggleMenu(false)}/>
              : <FontAwesomeIcon icon={faBars} onClick={ () => setToggleMenu(true)}/>
            }
          </div>
            {toggleMenu && (
              <div className="nav_triple_bar_links_container">
                <div className="nav_triple_bar_links">
                  <p><Link to="/login">Log In</Link></p>
                  <p><Link to="/register">Sign Up</Link></p>
                </div>
              </div>
            )}
          
        </div>

      </ul>




    </nav>
  );
}
