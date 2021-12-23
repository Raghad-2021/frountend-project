import React,{useEffect, useState} from "react";
import { Navbar, Container , Nav, Form, Button, FormControl } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import "./Nav.css";
export default function NavBar({ _token }) {
  const [token, setToken] =useState(null);
  const [role, setRole] =useState(null);
  const history = useHistory()
  useEffect(() => {
    // ياخذ التوكن ويخزنها بالوكل ستوريج
    const token = localStorage.getItem('token')
    const _role = localStorage.getItem('role')
    // حسب الرول نعدل في النفبار
    setRole(_role)
    setToken(token)
  } , [_token])

  const logout = () =>{
    setToken (null);
    setRole (null);
    localStorage.removeItem('token')
        // تسجيل خروج مسحنه التوكن

    localStorage.removeItem('role')
        // تسجيل خروج مسحنه الرول

    history.replace('login')
  }
 

  
  return (
    <Navbar>
  <Container fluid>
    <Navbar.Brand href="#">Netflex</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
    // اذا 
    {token &&  role == "user"?
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >

        
        <Nav.Link href="/movies">movies</Nav.Link>
        <Nav.Link href="/Home">Home</Nav.Link>

        <Nav.Link onClick={logout}>logout</Nav.Link>

      </Nav>
      :null}
      {!token ? 
                //  اذا مافي توكن يظهر تسجيل وتسجيل دخول

        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
            
          navbarScroll
        >
        <Nav.Link href="/SinUp">SinUp</Nav.Link>
        <Nav.Link href="/logIn">login</Nav.Link>
        </Nav>: null}

      {token &&  role == "admin"?
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >

        
        <Nav.Link href="/movies">Add movies</Nav.Link>

        <Nav.Link onClick={logout}>logout</Nav.Link>

      </Nav>
      :
     null}
       
      {token && role != "admin" ?
      <Form className="d-flex">
      
      </Form> : null}
      
    </Navbar.Collapse>
  </Container>
</Navbar>

  );
 }
