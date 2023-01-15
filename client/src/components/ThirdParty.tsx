import React from "react";
import {Link} from 'react-router-dom';
import "../css/App.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faGoogle, faMicrosoft, faGithub} from "@fortawesome/free-brands-svg-icons";
import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios"

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
  return (
  <div>
    <button className="third-party-btn">
      <FontAwesomeIcon className="third-party-icon" icon={faMicrosoft} size="2x" fixedWidth/>Login with Microsoft
    </button>
  </div>
);
};

export const GitHubLogin = () => {
  return (
  <div>
    <button className="third-party-btn">
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
  return (
  <div>
    <button className="third-party-btn">
      <FontAwesomeIcon className="third-party-icon" icon={faMicrosoft} size="2x" fixedWidth/>Register with Microsoft
    </button>
  </div>
  );
};

export const GitHubRegister = () => {
return (
<div>
  <button className="third-party-btn">
    <FontAwesomeIcon className="third-party-icon" icon={faGithub} size="2x" fixedWidth/>Register with GitHub
  </button>
</div>
);
};