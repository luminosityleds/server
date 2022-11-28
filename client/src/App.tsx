import React, {FC} from 'react';
import "./css/App.css";
import { Login } from "./components/Login"
import { Register } from "./components/Register"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom" 

const App: FC = () => {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path='/' element={
          <div>
            <h1>Home Page</h1>
            <h2><Link to="/login">Login</Link></h2>
            <h2><Link to="/register">Register</Link></h2>
          </div>
        }/>
          <Route path='/login' element={
            <div className="Login">
              <Login username='username' password='password'/>
            </div>
          }/>
          <Route path='/register' element={
            <div className="Register">
              <Register username='username' password='password' />
            </div>
          }/>
          <Route path='*' element={ <h1>404 Not Found</h1> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
