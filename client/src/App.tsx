import React, {FC} from 'react';
import "./css/App.css";
import { Login } from "./components/Login"

const App: FC = () => {
  return (
    <div className="App">
      <div className="Login">
        <Login username='username' password='password'/>
      </div>
    </div>
  );
}

export default App;
