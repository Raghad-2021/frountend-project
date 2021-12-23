import React, { useState } from "react";
import LogIn from "./Components/logIn";
import Movies from "./Components/Movies"
import SinUp from "./Components/sinUp";
import NavBar from "./Components/NavBar";
import { Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import AdminHome from "./Components/AdminHome";
export default function App() {
  const [token, setToken] = useState(null);

  return (
    <div>
      <div className="container">
        <NavBar _token={token} setToken={setToken} />
        <Route
          exact
          path="/LogIn"
          render={() => {
            return <LogIn setToken={setToken} />;
          }}
        />
        <Route exact path="/SinUp" component={SinUp} />
        <Route exact path="/admin-home" component={AdminHome} />
        <Route
          exact
          path="/Movies"
          render={() => {
            return <Movies token={token} />;
          }}
        />
        
      </div>
    </div>
  );
}
