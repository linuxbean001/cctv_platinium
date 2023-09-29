import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { setCustomerData } from "../../../src/app/features/counter/counterSlice";

import { useDispatch } from "react-redux";

function Registration() {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({
    customerName: "",
    businessName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = () => {
    dispatch(setCustomerData(formData));
    setFormData({
      customerName: "",
      businessName: "",
      email: "",
      phoneNumber: "",
      address: "",
    });
    handleClose();
  };

  React.useEffect(() => {
    handleShow();
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Customer Details :</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label> Customer Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="customerName"
                      placeholder="Enter Customer Name"
                      value={formData.customerName}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label> Business Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="businessName"
                      placeholder="Enter Business Name"
                      value={formData.businessName}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label> Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label> Phone Number</Form.Label>
                    <Form.Control
                      type="number"
                      name="phoneNumber"
                      placeholder="Enter Phone Number"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label> Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      placeholder="Enter Address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                    <Form.Text className="text-muted text-center fst-italic">
                      We'll never share your info with anyone else.
                    </Form.Text>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Col style={{ backgroundColor: "" }}>
            <Button variant="dark" type="submit" onClick={handleFormSubmit}>
              Submit
            </Button>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button variant="dark" type="submit" onClick={handleClose}>
              Skip
            </Button>
          </Col>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Registration;
