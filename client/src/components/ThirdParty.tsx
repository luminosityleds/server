import React from "react";
import {Link} from 'react-router-dom';
import "../css/App.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faGoogle, faMicrosoft, faGithub} from "@fortawesome/free-brands-svg-icons";
import { useGoogleLogin } from "@react-oauth/google"
import { PublicClientApplication } from "@azure/msal-browser"
import axios from "axios"
import queryString from "querystring"

// Microsoft config
export const MicrosoftConfig = {
  auth: {
    // Place your clientId
    clientId: ".env.CLIENT_ID",
    authority: 'https://login.microsoftonline.com/common/',
    redirectUri: 'http://localhost:3000/auth/redirect',
    postLogoutRedirectUri: 'http://localhost:3000'

  }
}

const msalInstance = new PublicClientApplication(MicrosoftConfig)

// Github Client ID
const CLIENT_ID = process.env.REACT_APP_GH_ID;

// Login components
export const GoogleLogin = () => {
  const login = useGoogleLogin({
    onSuccess: async response => {
      try {
        const google_response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", 
        {
          headers: {
            "Authorization": `Bearer ${response.access_token}` 
          }
        })
        
        const google_data = {
          email: google_response.data.email,
          name: google_response.data.name
        }
        
        const login_response = axios.post('http://localhost:4000/app/account',
        google_data
        ).then(response => {
          if (response.data.success === true) {
            // Set that the user is now logged in
            window.localStorage.setItem("isLoggedIn", "true")
            window.localStorage.setItem("userName", google_data.name)

            // Go back to the homepage
            window.location.href = "/"
          }

          else if (response.data.success === false) {
            // Go to the registration page
            window.location.href = "/register"
          }
        });
      }
      catch (err) {
        console.log(err);
      }
    }
  });

  return (
  <div>
    <button className="third-party-btn" onClick={() => login()}>
      <FontAwesomeIcon className="third-party-icon" icon={faGoogle} size="2x" fixedWidth/>Login with Google
    </button>
  </div>
);
};

export const MicrosoftLogin = () => {
  const login = async function() {
    var loginRequest = {
      scopes: ["user.read"],
      prompt: "select_account"
    };
  
    try {
      const loginResponse = await msalInstance.loginPopup(loginRequest);
      console.log(loginResponse)
    }
    catch (err) {
      console.log(err);
    }
  }
  return (
  <div>
    <button className="third-party-btn" onClick={() => login()}>
      <FontAwesomeIcon className="third-party-icon" icon={faMicrosoft} size="2x" fixedWidth/>Login with Microsoft
    </button>
  </div>
);
};

export const GitHubLogin = () => {
  function login() {
    // Default scopes 
    window.location.href = "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID;
  }
  return (
  <div>
    <button className="third-party-btn" onClick={login}>
      <FontAwesomeIcon className="third-party-icon" icon={faGithub} size="2x" fixedWidth/>Login with GitHub
    </button>
  </div>
);
};

// Register components
export const GoogleRegister = () => {
  const register = useGoogleLogin({
    onSuccess: async response => {
      try {
        const google_response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", 
        {
          headers: {
            "Authorization": `Bearer ${response.access_token}` 
          }
        }) 

        const data = {
          email: google_response.data.email,
          name: google_response.data.name
        }

        const backend_response = axios.post('http://localhost:4000/app/register', data)
                                      .then(response => console.log(response.data));
        
        // Set that the user is now logged in
        window.localStorage.setItem("isLoggedIn", "true")
        window.localStorage.setItem("userName", data.name)

        // Go back to the homepage
        window.location.href = "/"
      }
      catch (err) {
        console.log(err);
      }
    }
  });

  return (
  <div>
    <button className="third-party-btn" onClick={() => register()}>
      <FontAwesomeIcon className="third-party-icon" icon={faGoogle} size="2x" fixedWidth/>Register with Google
    </button>
  </div>
);
};

export const MicrosoftRegister = () => {
  

  const login = async function() {
    var loginRequest = {
      scopes: ["user.read"],
      prompt: "select_account"
    };
  
    try {
      const loginResponse = await msalInstance.loginPopup(loginRequest);
      console.log(loginResponse)
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
  <div>
    <button className="third-party-btn" onClick={() => login()}>
      <FontAwesomeIcon className="third-party-icon" icon={faMicrosoft} size="2x" fixedWidth/>Register with Microsoft
    </button>
  </div>
  );
};

export const GitHubRegister = () => {
  function register() {
    // Default scopes 
    window.location.href = "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID;
  }  
return (
<div>
  <button className="third-party-btn" onClick = {register}>
    <FontAwesomeIcon className="third-party-icon" icon={faGithub} size="2x" fixedWidth/>Register with GitHub
  </button>
</div>
);
};
