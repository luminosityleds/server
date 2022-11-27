import React, {FC} from 'react';
import "./css/App.css";
import { Login } from "./components/Login"
import { Register } from "./components/Register"

const App: FC = () => {
  return (
    <div className="App">
      <div className="Login">
        <Login username='username' password='password'/>
      </div>
      <div className="Register">
        <Register username='username' password='password' />
      </div>

    </div>
  );
}

export default App;
