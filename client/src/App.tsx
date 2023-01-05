import React, { FC } from "react";
import "./css/App.css";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Header";
import SiteInfo from "./components/Main";
import Desktop1 from "./components/AccountPg";
import Footer from "./components/Footer";

const App: FC = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="page-container">
        <div className="content-wrap">
        <SiteInfo />
          <Routes>
            <Route path="/" element={<div></div>} />
            <Route
              path="/login"
              element={
                <div className="Login">
                  <Login username="username" password="password" />
                </div>
              }
            />
            <Route
              path="/register"
              element={
                <div className="Register">
                  <Register username="username" password="password" />
                </div>
              }
            />
          <Route
              path="/account"
              element={
                <div className="Desktop1">
                  <Desktop1 {...desktop1data} />
                </div>
              }
            />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
