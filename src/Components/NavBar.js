import React, { useEffect, useState } from "react";
import {Navbar,Container, Nav,Form,Button,FormControl,} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "./Nav.css";


export default function NavBar({ _token }) {
  
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("token");
        // ياخذ التوكن ويخزها بالوكل ستوريج
    const _role = localStorage.getItem("role");
           // ياخذ الرول ويخزنها بالوكل ستوريج

    setRole(_role);
        // حسب الرول نعدل في النفبار

    setToken(token);
  }, [_token]);

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem("token");
    // تسجيل خروج مسحنه التوكن

    localStorage.removeItem("role");
    // تسجيل خروج مسحنه الرول

    history.replace("login");
  };

  return (
    <div className="div22">
      {token && role == "user" ? (
            // هنا يشيك لو فيه توكن والرول نوعه يوزر

        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >

        
          <Nav.Link href="/movies">movies</Nav.Link>

          <Nav.Link href="/Home">Home</Nav.Link>
        
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
          <Nav.Link href="/SinUp" className="ss">
            SinUp
          </Nav.Link>
          <Nav.Link href="/logIn"  className="ss">login</Nav.Link>
        </Nav>
      ) : null}
      {token && role == "admin" ? (
                  // هنا يشيك لو فيه توكن والرول نوعه ادمن

        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          <Nav.Link href="/admin-home" className="ss">Add movies</Nav.Link>
          <Nav.Link href="/movies" className="ss">movies</Nav.Link>
          <Nav.Link href="/Favorite" className="ss">Favorite</Nav.Link>

          <Nav.Link onClick={logout}>logout</Nav.Link>
        </Nav>
      ) : null}

      {token && role != "admin" ? <Form className="d-flex"></Form> : null}
      // هنا عشان نخفي البحث يوم يكون ادمن
    </div>
  );
}
