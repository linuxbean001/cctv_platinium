import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import hotelImage from "../../assets/images/Categories/Restaurant-Security-Cameras-1.jpg";
import Papa from "papaparse";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

function Home(props) {
  console.log(props);

  const navigate = useNavigate();
  const [options, setOptions] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [show, setShow] = React.useState(false);

  const cameraOptions = [
    { location_name: "Home" },
    { location_name: "Restaurant" },
    { location_name: "Internet" },
    { location_name: "Dealer" },
    { location_name: "Custom" },
    { location_name: "Property Mangaement" },
  ];

  React.useEffect(() => {
    const fetchData = async () => {
      const file = "csv/products.csv";
      const response = await fetch(file);
      const csvText = await response.text();
      const parsedData = Papa.parse(csvText, { header: true }).data;
      setData(parsedData);
    };
    fetchData();
  }, []);

  // data.forEach((item) => {
  //   console.log(item)
  // })
  const handleOptions = (e) => {
    const { name, value } = e.target;
    setOptions((prevValues) => {
      return {
        ...prevValues,
        name: value,
      };
    });
    setShow(true);
  };
  console.log(show)

  return (
    <>
      <Container className="my-4" fluid style={{ backgroundColor: "" }}>
        <Row className="p-1">
          {/* Left */}
          <Col md={9}>
            <Row className="my-4">
              {cameraOptions.map((details) => {
                return (
                  <Col className="my-4" style={{ backgroundColor: "" }}>
                    <Card style={{ width: "18rem" }}>
                      <Card.Img variant="top" height={200} src={hotelImage} />
                      <Card.Body>
                        <Card.Title>{details.location_name}</Card.Title>
                        <Card.Text>
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </Card.Text>
                        <Button
                          variant="dark"
                          name={details.location_name || ""}
                          value={details.location_name || ""}
                          onClick={handleOptions}
                        >
                          {details.location_name}
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
        {/* Modal Starts */}
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>First Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="my-2">
              <Col md={8} style={{ backgroundColor: "" }}>
                Number of Options
              </Col>
              <Col md={4} style={{ backgroundColor: "" }}>
                <a href="#">-</a>
                <a href="#" class="border">
                  1
                </a>
                <a href="#">+</a>
              </Col>
            </Row>
            {/* <Modal show={showNested} onHide={handleCloseNested}>
              <Modal.Header closeButton>
                <Modal.Title>*Use Templates</Modal.Title>
              </Modal.Header>
              <Modal.Body>Use Templates?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleNumberModal}>
                  Yes
                </Button>
                <Button variant="primary" onClick={handleNumberModal}>
                  No
                </Button>
              </Modal.Footer>
            </Modal> */}

            {/* End of Nested Modal */}
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="d-block"
              variant="info"
              onClick={() => setShow(true)}
            >
              Next
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Modal Ends */}
        {/* Modal Camera Numbers */}
      </Container>
    </>
  );
}

export default Home;
