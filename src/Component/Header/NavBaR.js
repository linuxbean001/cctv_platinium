
import React, { useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";
import { persistor } from '../../app/store'; // Import your Redux persistor

function NavBar(props) {

// Clearing State on Button Click
const handleClearState = () => {
  persistor.purge(); // This will clear the persisted state
  window.location.reload(); // This will refresh the page
};

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
          <Nav.Link onClick={handleClearState}>Clear Cart</Nav.Link>
          <Nav.Link href="/add_to_cart">CheckCart</Nav.Link>
          <Nav.Link href="#features">CSV Export</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar