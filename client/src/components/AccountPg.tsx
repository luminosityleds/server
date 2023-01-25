import React from "react";
import "../css/App.css";

class AccountPg extends React.Component {
  render() {
    return (
      <div className="background">
        <div className="header-container">
          <h1>Hello, </h1>
          <img alt="user's pfp" />
          <h2>My Account Information</h2>
          <div className="account-container">
            <div className="ainfo">
              <span>Username:</span>
              <button className="edit">Edit</button>
            </div>
            <div className="ainfo">
              <span>Email:</span>
              <button className="edit">Edit</button>
            </div>
            <div className="ainfo">
              <span>Phone Number:</span>
              <button className="edit">Edit</button>
            </div>
          </div>
        </div>
        <div className="btns-container">
          <button className="reset-btn">Reset Password</button>
          <button className="delete-btn">Delete Accoount</button>
        </div>
      </div>
    );
  }
}

export default AccountPg;
