import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { persistor } from "../../app/store";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavBar(props) {
  const handleClearState = () => {
    persistor.purge();
    window.location.reload();
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Platinum CCTV</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Homes
            </Nav.Link>
          </Nav>
          <Nav className="mr-auto">
            <NavDropdown title="Available Pages" id="basic-nav-dropdown">
              <Nav.Link as={Link} to="/nvr">
                NVR
              </Nav.Link>{" "}
              <Nav.Link as={Link} to="/cameras">
                Cameras
              </Nav.Link>{" "}
              <Nav.Link as={Link} to="/poe-switch">
                PoE
              </Nav.Link>{" "}
              <Nav.Link as={Link} to="/hardware">
                Hardware
              </Nav.Link>{" "}
              <Nav.Link as={Link} to="/special">
                Special Items
              </Nav.Link>{" "}
              <Nav.Link as={Link} to="/cabling">
                Cables
              </Nav.Link>{" "}
              <Nav.Link as={Link} to="/labor_rate">
                Labor
              </Nav.Link>{" "}
              <Nav.Link as={Link} to="/pdf">
                Pdf
              </Nav.Link>{" "}
              <Nav.Link as={Link} to="/test">
                Test
              </Nav.Link>{" "}
            </NavDropdown>
          </Nav>
          <Nav className="">
            <Nav.Link onClick={handleClearState}>Clear Cart</Nav.Link>
            <Nav.Link as={Link} to="/pdf" >CheckCart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
