import React, { useState } from "react";
import LogIn from "./Components/logIn";
import Movies from "./Components/Movies";
import Home from "./Components/Home";
import Comment from "./Components/Comment";
import SinUp from "./Components/sinUp";
import NavBar from "./Components/NavBar";
import { Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AdminHome from "./Components/AdminHome";
export default function App() {
  const [token, setToken] = useState(null);
  const [role, setrole] = useState(null);
  return (
    <div>
      <h1>{token}</h1>
      <div className="container">
        <NavBar token={token} setToken={setToken} />

        <Route
          exact
          path="/LogIn"
          render={() => {
            return <LogIn setToken={setToken} />;
          }}
        />
        <Route exact path="/SinUp" component={SinUp} />
        <Route exact path="/admin-home" render={() => <AdminHome  token={token}  />} />

        <Route
          exact
          path="/movies"
          render={() => {
            return <Movies token={token} />;
          }}
        />

        <Route
          exact
          path="/Comment/:id"
          render={() => {
            return <Comment token={token} />;
          }}
        />
      </div>
    </div>
  );
}
