import React, { useEffect, useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";
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
          <Link to="/movies">
            {" "}
            <a>movies</a>
          </Link>

          <Link to="/home">
            <a>Home</a>
          </Link>

          <Nav.Link onClick={logout}>logout</Nav.Link>
        </Nav>
      ) : null}
      {!token ? (
        //  اذا مافي توكن يظهر تسجيل وتسجيل دخول

        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          <Link to="SinUp">
            {" "}
            <a className="ss">SinUp</a>
          </Link>
          <Link to="login">
            {" "}
            <a className="ss">login</a>
          </Link>
        </Nav>
      ) : null}
      {token && role == "admin" ? (
        // هنا يشيك لو فيه توكن والرول نوعه ادمن

        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          <Link to="/admin-home">
            {" "}
            <a className="ss">Add movies</a>
          </Link>
          <Link to="/movies">
            {" "}
            <a className="ss">movies</a>
          </Link>
          <Link to="/Favorite">
            {" "}
            <a className="ss">Favorite</a>
          </Link>

          <Nav.Link onClick={logout}>logout</Nav.Link>
        </Nav>
      ) : null}

      {token && role != "admin" ? <Form className="d-flex"></Form> : null}
    </div>
  );
}
// هنا عشان نخفي البحث يوم يكون ادمن
