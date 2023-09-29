import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

function NoFound() {
  const navigate = useNavigate();

   const paths = [
     ["/", "Home"],
     ["/nvr", "NVR"],
     ["/cameras", "Cameras"],
     ["/poe-switch", "Poe Switch"],
     ["/hardware", "Hardware"],
     ["/special", "Special"],
     ["/cabling", "Cabling"],
     ["/labor_rate", "Labor Rate"],
     ["/pdf", "PDF"],
   ];

    const groupedPaths = [];
    for (let i = 0; i < paths.length; i += 3) {
      groupedPaths.push(paths.slice(i, i + 3));
    }

  return (
    <>
      <Container
        className="mt-3 d-flex justify-content-center align-items-center"
        style={{ minHeight: "92vh" }}
      >
        <Row>
          <Col className="text-center">
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Row>
              <Col className="text-center mt-2 mb-2">
                <h4>All Routes</h4>
                <Table striped bordered hover>
                  <tbody>
                    {groupedPaths.map((group, index) => (
                      <tr key={index}>
                        {group.map((path, pathIndex) => (
                          <td
                            key={pathIndex}
                            onClick={() => navigate(path[0])}
                            style={{cursor:"pointer"}}
                          >
                            {path[1]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Button variant="dark" onClick={() => navigate("/")}>
              Go Back to Home Page
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default NoFound;
