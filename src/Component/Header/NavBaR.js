import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { persistor } from "../../app/store";

function NavBar(props) {
  const handleClearState = () => {
    persistor.purge();
    window.location.reload();
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Platinum CCTV</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Nav className="mr-auto">
            <Nav.Link onClick={handleClearState}>Clear Cart</Nav.Link>
            <Nav.Link href="/pdf">CheckCart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
