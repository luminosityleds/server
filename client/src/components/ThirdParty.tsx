import React from "react";
import "../css/App.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faApple, faGoogle, faMicrosoft, faGithub} from "@fortawesome/free-brands-svg-icons";
import { useGoogleLogin } from "@react-oauth/google"
import { PublicClientApplication } from "@azure/msal-browser"
import axios from "axios"

// Microsoft config
export const MicrosoftConfig = {
  auth: {
    // Place your clientId
    clientId: '56d1f83f-16ae-432e-890c-31352348af92',
    authority: 'https://login.microsoftonline.com/common/'
  }
}

const msalInstance = new PublicClientApplication(MicrosoftConfig)

// Login components
export const AppleLogin = () => {
    return (
    <div>
      <button className="third-party-btn">
        <FontAwesomeIcon className="third-party-icon" icon={faApple} size="2x" fixedWidth/>Login with Apple
      </button>
    </div>
  );
};

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

        console.log(google_response)
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
      <FontAwesomeIcon className="third-party-icon" icon={faMicrosoft} size="2x" fixedWidth/>
      <a href="/auth/signin">Login with Microsoft</a>
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
export const AppleRegister = () => {
  return (
  <div>
    <button className="third-party-btn">
      <FontAwesomeIcon className="third-party-icon" icon={faApple} size="2x" fixedWidth/>Register with Apple
    </button>
  </div>
);
};

export const GoogleRegister = () => {
  const login = useGoogleLogin({
    onSuccess: async response => {
      try {
        const google_response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", 
        {
          headers: {
            "Authorization": `Bearer ${response.access_token}` 
          }
        }) 

        console.log(google_response)
      }
      catch (err) {
        console.log(err);
      }
    }
  });

  return (
  <div>
    <button className="third-party-btn" onClick={() => login()}>
      <FontAwesomeIcon className="third-party-icon" icon={faGoogle} size="2x" fixedWidth/>Register with Google
    </button>
  </div>
);
};

export const MicrosoftRegister = () => {
  

  const login = async function() {
    var loginRequest = {
      scopes: ["user.read"]
    };
  
    try {
      const loginResponse = await msalInstance.loginPopup(loginRequest);
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
return (
<div>
  <button className="third-party-btn">
    <FontAwesomeIcon className="third-party-icon" icon={faGithub} size="2x" fixedWidth/>Register with GitHub
  </button>
</div>
);
};