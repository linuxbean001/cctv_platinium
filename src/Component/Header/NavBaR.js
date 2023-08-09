
import React, { useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";


function NavBar(props) {

 
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Platinum CCTV</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#features">About Us</Nav.Link>
          </Nav>
          <Nav className="mr-auto">
          <Nav.Link href="/add_to_cart">CheckCart</Nav.Link>
            <Nav.Link href="#features">CSV Export</Nav.Link>
          </Nav>
      
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar