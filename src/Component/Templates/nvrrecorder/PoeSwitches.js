import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from 'react-bootstrap/Modal';
import "./index.css";
import Papa from "papaparse";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from "react-router-dom"


const onlineImageURL = 'https://images.pexels.com/photos/326508/pexels-photo-326508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';


// Modal-1 Starts
function MyVerticallyCenteredModal(props) {
// Increment and Decrement
const [count, setCount] = useState(0);
const handleIncrement = () => {
  setCount(count + 1);
};
const handleDecrement = () => {
  setCount(count - 1);
};

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                16-Port PoE Switch with 480 Watts
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
        <Container>
          <Row>
            <Col md={4}>
              <Row>
                <Card.Img
                  variant="top"
                  height={150}
                  src={onlineImageURL}
                />
              </Row>
              <Row className="my-2">
                <Col> <Card.Img
                  variant="top"
                  height={50}
                  src={onlineImageURL}
                /></Col>
                <Col> <Card.Img
                  variant="top"
                  height={50}
                  src={onlineImageURL}
                /></Col>
                <Col> <Card.Img
                  variant="top"
                  height={50}
                  src={onlineImageURL}
                /></Col>
              </Row>
            </Col>
            <Col md={8}>
              <p>Description:
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem, corrupti?
              </p>
              <p>Options:
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <DropdownButton variant="dark" id="dropdown-basic-button" title="Options">
                <Dropdown.Item href="#/action-1">
                  {
                    props.modalTitle === 'MicroNVR' ? props.data3[0].featurename
                      : props.modalTitle === 'MidNVR' ? props.data3[1].featurename
                        : props.modalTitle === 'PlatinumNVR' ? props.data3[2].featurename
                          : null
                  }
                </Dropdown.Item>
              </DropdownButton>
              <div className="d-flex align-items-end justify-content-end" style={{ backgroundColor: '' }}>
                <Button variant="dark" onClick={handleIncrement}>
                  +
                </Button>
                <h6 className="mx-3">{count}</h6>
                <Button variant="dark" onClick={handleDecrement}>
                  -
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
                <Button variant="dark" onClick={props.onHide}>Back</Button>
                <Button variant="dark" onClick={props.onHide}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
}


// Modal-2 Starts
function MyVerticallyCenteredModal2(props) {
    const navigate = useNavigate();
        return (
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header closeButton>
          <Modal.Title> <h6> Warning ! There are not enough PoE Ports for cameras 
</h6> </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to continue ?</Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="dark" onClick={() => navigate("/cameras")}>
           Yes
          </Button>
          <Button variant="dark" onClick={props.onHide}>
            No
          </Button>
        </Modal.Footer>
            </Modal>
        );
    }

//Modal Ends

function PoeSwitches() {
    // Modal state-1
    const [modalShow, setModalShow] = React.useState(false);
    // Modal state-2
     const [modalShow2, setModalShow2] = React.useState(false);

  
// Modal-1 Open
    function handleButtonClick(e) {
        setModalShow(true)
    }

    // Modal-2 Open
    function handleButtonClick2(e) {
        setModalShow2(true)
    }

    return (
        <>
            <Container fluid className="my-4" style={{ backgroundColor: "" }}>
                <Container>
                    <Row style={{ backgroundColor: "" }}>
                        <Col style={{ backgroundColor: "" }}>
                            <h2>
                                POEs Switches{" "}
                                <span className="fst-italic fs-6">(Category)</span>
                            </h2>
                        </Col>
                        {/* Right */}
                        <Col className="" style={{ backgroundColor: "" }}>
                            <Row>
                                <Col className="text-end">
                                    Total Number of Cameras : <span className="fw-bold">??</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-end">
                                    <h6>
                                        Toal Number of Ports : <span className="fw-bold">??</span>
                                    </h6>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    {/* Box Row */}
                    <Row className="my-4">

                        <Col md={4} className="nvr_col" onClick={(e) => handleButtonClick(e)}>
                            <Card style={{ width: "", margin: "" }}>
                                <Card.Body>
                                    <Card.Title className="fw-bold">SKU :  192</Card.Title>
                                    <Card.Text>
                                        {" "}
                                        Description :
                                        Lorem Ipsum.....
                                    </Card.Text>
                                    <Row>
                                        <Col xs={8}>
                                            <Card.Img
                                                variant="top"
                                                height={150}
                                                src={onlineImageURL}
                                            />
                                        </Col>
                                        <Col
                                            xs={4}
                                            className="d-flex align-items-center justify-content-center fw-bold"
                                        >
                                            $ 500
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* Table */}
                    <Row className="my-4" style={{ padding: "8px" }}>
                        <Col style={{}}>
                            <div className="table-border">
                                <Table striped hover>
                                    <thead></thead>
                                    <tbody>
                                        <tr>
                                            <td>Adding to Cart</td>
                                            <td>QTY</td>
                                            <td>SKU</td>
                                            <td>Description</td>
                                            <td>Total:</td>
                                            <td>Licenses:</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>QTY</td>
                                            <td>SKU</td>
                                            <td>Description</td>
                                            <td>Total:</td>
                                            <td>Licenses:</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>QTY</td>
                                            <td>SKU</td>
                                            <td>Description</td>
                                            <td>Total:</td>
                                            <td>Licenses:</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>Total:</td>
                                            <td>Total:</td>
                                            <td>Licenses:</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>

                    {/* Button */}
                    <Row className="my-4" style={{ backgroundColor: "" }}>
                        <Col className="d-flex justify-content-between">

                            <Button className="poe_next_btn" variant="dark" onClick={(e) => handleButtonClick2(e)} >Next</Button>
                        </Col>
                    </Row>
                </Container>
            </Container>

            
            <MyVerticallyCenteredModal
                  show={modalShow}
                 onHide={() => setModalShow(false)}
           />   

        <MyVerticallyCenteredModal2
                  show={modalShow2}
                 onHide={() => setModalShow2(false)}
           />   
        </>
    )
}

export default PoeSwitches