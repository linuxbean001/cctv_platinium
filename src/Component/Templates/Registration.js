import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from 'react-bootstrap/Modal';

function Registration() {
    // Modal State
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //Modal Ends

    React.useEffect(()=>{
        handleShow()
    },[])

    return (
        <>
            {/* Modal Content */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Customer Details :</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>


                            <Col>
                                <Form>
                                    {/* Name */}
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label> Customer Name</Form.Label>
                                        <Form.Control type="email" placeholder="Enter Customer Name" />

                                    </Form.Group>

                                    {/* Business Name */}

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label> Business Name</Form.Label>
                                        <Form.Control type="email" placeholder="Enter Business Name" />

                                    </Form.Group>

                                    {/* Email  */}

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label> Email</Form.Label>
                                        <Form.Control type="email" placeholder="Enter Email" />

                                    </Form.Group>

                                    {/* Phone Number  */}

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label> Phone Number</Form.Label>
                                        <Form.Control type="number" placeholder="Enter Phone Number" />

                                    </Form.Group>

                                    {/* Address  */}

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label> Address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter Address" />
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

                    <Col style={{ backgroundColor: '' }}>
                        <Button variant="dark" type="submit">
                            Submit
                        </Button></Col>
                    <Col className='d-flex justify-content-end'>

                        <Button variant="dark" type="submit" onClick={handleClose}>
                            Skip
                        </Button>
                    </Col>

                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Registration