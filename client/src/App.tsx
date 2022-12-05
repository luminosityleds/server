import React, { FC } from "react";
import "./css/App.css";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Header";
import SiteInfo from "./components/Main";

const App: FC = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="App">
        <SiteInfo />
        <Router>
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
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
