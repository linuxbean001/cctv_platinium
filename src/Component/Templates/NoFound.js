import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function NoFound() {
  const navigate = useNavigate();

  return (
    <>
      <Container className="mt-3" style={{backgroundColor:''}}>
        <Row>
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
          <Button style={{display:'inline-flex'}} variant="link" onClick={() => navigate("/")}>
            Go Back to Home Page{" "}
          </Button>
        </Row>
      </Container>
    </>
  );
}

export default NoFound;
