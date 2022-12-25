import React from "react";
import "../css/ThirdParty.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faApple, faGoogle, faMicrosoft, faGithub} from "@fortawesome/free-brands-svg-icons";

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
  return (
  <div>
    <button className="third-party-btn">
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
return (
<div>
  <button className="third-party-btn">
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