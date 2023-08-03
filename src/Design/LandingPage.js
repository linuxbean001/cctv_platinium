import { React, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import homeImage from '../assets/images/Categories/Home-Cameras.jpg'
import warehouseImage from '../assets/images/Categories/Warehouse-Security-Cameras.jpg'
import hotelImage from '../assets/images/Categories/Restaurant-Security-Cameras-1.jpg'



function LandingPage() {
  const [show, setShow] = useState(false);
  const [showNested, setShowNested] = useState(false); // State for the nested modal

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseNested = () => setShowNested(false);
  const handleShowNested = () => setShowNested(true);
  const imgUrl_1 = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80';
  const imgUrl_2 = 'https://plus.unsplash.com/premium_photo-1675016457613-2291390d1bf6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80';
  const imgUrl_3 = 'https://images.unsplash.com/photo-1600069620961-8bee77c2e28a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=773&q=80';
  
  return (
    <>
  {/* Modal Starts */}

   <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>First Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row className='my-2'>
              <Col md={8} style={{backgroundColor:''}}>Number of Options</Col>
              <Col md={4} style={{backgroundColor:''}}>
                  <a href="#">-</a><a href="#" class="border">1</a><a href="#">+</a>
              </Col>

            </Row>
          <Button className='d-block' variant="info" onClick={handleShowNested}>
            Next
          </Button>

          {/* Nested Modal */}
          <Modal show={showNested} onHide={handleCloseNested}>
            <Modal.Header closeButton>
              <Modal.Title>Nested Modal Heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Content for the Nested Modal</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseNested}>
                Close
              </Button>
              <Button variant="primary" onClick={handleCloseNested}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          {/* End of Nested Modal */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  {/* Modal Ends */}
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Platinum CCTV</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">About Us</Nav.Link>
          </Nav>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Check Cart</Nav.Link>
            <Nav.Link href="#features">CSV Export</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="my-4" fluid style={{ backgroundColor: '' }}>
        <Row className='p-1'>
          {/* Left */}
          <Col md={9} style={{ backgroundColor: '' }}>
            
            
            {/*  Row-1 */}

            <Row>
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" height={200}  src={homeImage} />
                <Card.Body>
                  <Card.Title>Home</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Button variant="dark">Home</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" height={200} src={imgUrl_2} />
                <Card.Body>
                  <Card.Title>Business</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Button variant="dark">Business</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" height={200} src={warehouseImage} />
                <Card.Body>
                  <Card.Title>Warehouse</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Button variant="dark">Warehouse</Button>
                </Card.Body>
              </Card>
            </Col>
            </Row>
            
            {/*  Row-2 */}

            <Row className='my-4'>
               <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" height={200}  src={hotelImage} />
                <Card.Body>
                  <Card.Title>Restaurent</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Button variant="dark">Restaurent</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" height={200} src={imgUrl_2} />
                <Card.Body>
                  <Card.Title>Property Management</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Button variant="dark">Property Management</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" height={200} src={imgUrl_3} />
                <Card.Body>
                  <Card.Title>Internet</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Button variant="dark">Internet</Button>
                </Card.Body>
              </Card>
            </Col>
            </Row>

            {/*  Row-3 */}
            <Row>
               <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" height={200}  src={imgUrl_1} />
                <Card.Body>
                  <Card.Title>Takeover</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Button variant="dark">Takeover</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" height={200} src={imgUrl_2} />
                <Card.Body>
                  <Card.Title>Dealer</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Button variant="dark">Dealer</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" height={200} src={imgUrl_3} />
                <Card.Body>
                  <Card.Title>Custom</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Button variant="dark">Custom</Button>
                </Card.Body>
              </Card>
            </Col>
            </Row>
            
            
          </Col>

          {/* Right */}

          <Col className='cart_box' md={3} style={{ backgroundColor: '', height:'320px' }}>
              <h5 className='my-4 text-center' style={{backgroundColor:'black',color:'#fff',padding:'10px',borderRadius:'5px'}}>Price Details</h5>
              <Row className='my-4 text-center' style={{backgroundColor:''}}> 
                <Col className='text-muted text-start'>Price (1 Item)</Col>
                <Col className='text-muted'>$500</Col>
              </Row>
              <Row className='my-4 text-center'>
                <Col className='text-muted  text-start'>Discount </Col>
                <Col className='text-muted'>$50</Col>
              </Row>
              <Row className='my-4 text-center'>
                <Col className='text-muted text-start'>Delivery Charges</Col>
                <Col className='text-muted'>Free</Col>
              </Row>

              {/* Final Amount */}
              
              <Row className='my-5 text-center'>
                <Col>
                  <h6>Total Amount</h6>
                </Col>
                <Col>
                <h6>$450</h6>
                
                </Col>
              </Row>
          </Col>
        </Row>

      </Container>
    </>
  )
}

export default LandingPage