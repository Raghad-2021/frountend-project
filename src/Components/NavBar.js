import React, { useEffect, useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  Button,
  FormControl,

} from "react-bootstrap";
import { FcLike } from 'react-icons/fc';

import { Link, useHistory } from "react-router-dom";
import "./Nav.css";

export default function NavBar({ token, setToken }) {
  // const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const history = useHistory();
  useEffect(() => {
    // const token = localStorage.getItem("token");
    // ياخذ التوكن ويخزها بالوكل ستوريج
    const _role = localStorage.getItem("role");
    // ياخذ الرول ويخزنها بالوكل ستوريج

    setRole(_role);
    // حسب الرول نعدل في النفبار

    //  setToken(token);
  }, [token]);

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem("token");
    // تسجيل خروج مسحنه التوكن

    localStorage.removeItem("role");
    // تسجيل خروج مسحنه الرول

    history.replace("../login");
  };

  return (
    <div className="div22">
      {token && role == "user" ? (
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
        <div className="NavBwr4">
          <Link to="/movies">
            {" "}
            <a className="NavBwr4">movies</a>
          </Link>

          <Link to="/home">
            <a className="NavBwr4">Home</a>
          </Link>
          <Link to="/Favorite">
          
          <a className="NavBwr4">
          Favorite</a>
        </Link>
          <Link className="NavBwr4" onClick={logout}>logout</Link>
         
          </div>
        </Nav>
      ) : null}
      {!token ? (
        //  اذا مافي توكن يظهر تسجيل وتسجيل دخول

        <Nav
          className="dropbtn"
          navbarScroll
        >
        <div className="bbbbbb">
          <Link to="SinUp">
            {" "}
            <a className="btn">SinUp</a>
          </Link>
          <Link to="login">
            {" "}
            <a className="btn">login</a>
          </Link>

          </div>
        </Nav>
      ) : null}
      {token && role == "admin" ? (
        // هنا يشيك لو فيه توكن والرول نوعه ادمن

        <Nav
          className="me-auto my-2 my-lg-0"
          navbarScroll
        >
          <Link to="/admin-home">

            <a className="btn">Add movies</a>
          </Link>
          <Link to="/movies">

            <a className="btn">movies</a>
          </Link>
          <Link to="/Favorite">
          <a className="btn">
          Favorite
          <FcLike/>    </a>
        </Link>
         
          <Nav.Link ClassName="bbbb" onClick={logout}>logout</Nav.Link>

        </Nav>
      ) : null}

      {token && role != "admin" ? <Form className="d-flex"></Form> : null}
    </div>
    
  );
}
// هنا عشان نخفي البحث يوم يكون ادمن
