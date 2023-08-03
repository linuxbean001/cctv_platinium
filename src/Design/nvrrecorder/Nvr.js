import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import homeImage from '../../assets/images/Categories/Home-Cameras.jpg'
import warehouseImage from '../../assets/images/Categories/Warehouse-Security-Cameras.jpg'
import './index.css'

function Nvr() {
    const imgUrl_1 = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80';
    const imgUrl_2 = 'https://plus.unsplash.com/premium_photo-1675016457613-2291390d1bf6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80';
    const imgUrl_3 = 'https://images.unsplash.com/photo-1600069620961-8bee77c2e28a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=773&q=80';
    return (
        <>
            <Container fluid className='my-4' style={{ backgroundColor: '' }}>
                <Container>
                    <Row style={{ backgroundColor: '' }}>
                        <Col style={{ backgroundColor: '' }}>
                            <h2>NVR Recorders <span className='fst-italic fs-6'>(Category)</span></h2>
                        </Col>
                        {/* Right */}
                        <Col className='' style={{ backgroundColor: '' }}>
                            <Row>
                                <Col className='text-end'>
                                    <h6>Number of Cameras : <span className='fw-bold'>10</span></h6>
                                </Col>
                            </Row>
                            <Row>
                                <Col className='text-end'>
                                    <h6>Number of Licenses : <span className='fw-bold'>20</span></h6>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    {/* Box Row */}

                    <Row className='my-4' style={{ }}>
                        <Col>
                            <Card style={{ width: '', margin: '' }}>
                                <Card.Body>
                                    <Card.Title>SKU:Micro NVR</Card.Title>
                                    <Card.Text> Description:
                                        Micro NVR to build  Micro NVR to build  Micro NVR to build.....
                                    </Card.Text>

                                    <Row>
                                        <Col xs={8}>
                                            <Card.Img variant="top" height={150} src={warehouseImage} />
                                        </Col>
                                        <Col xs={4} className="d-flex align-items-center justify-content-center fw-bold">$500</Col>

                                    </Row>

                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '', margin: '' }}>
                                <Card.Body>
                                    <Card.Title>SKU:Micro NVR</Card.Title>
                                    <Card.Text> Description:
                                        Micro NVR to build  Micro NVR to build  Micro NVR to build.....
                                    </Card.Text>

                                    <Row>
                                        <Col xs={8}>
                                            <Card.Img variant="top" height={150} src={warehouseImage} />
                                        </Col>
                                        <Col xs={4} className="d-flex align-items-center justify-content-center fw-bold">$500</Col>

                                    </Row>

                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '', margin: '' }}>
                                <Card.Body>
                                    <Card.Title>SKU:Micro NVR</Card.Title>
                                    <Card.Text> Description:
                                        Micro NVR to build  Micro NVR to build  Micro NVR to build.....
                                    </Card.Text>

                                    <Row>
                                        <Col xs={8}>
                                            <Card.Img variant="top" height={150} src={warehouseImage} />
                                        </Col>
                                        <Col xs={4} className="d-flex align-items-center justify-content-center fw-bold">$500</Col>

                                    </Row>

                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>

                    {/* Table */}

                    <Row className='my-4'style={{ padding:'8px'}} >
                        <Col style={{}} >
                        <div className="table-border">
                        <Table  striped hover>
                            <thead>

                            </thead>
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

                    <Row className='my-4' style={{backgroundColor:''}}>
                        <Col className='d-flex justify-content-between'>
                      <Button variant="dark">Previous</Button>
                      <Button variant="dark">Next</Button>

                        </Col>
                    </Row>
                </Container>

            </Container>
        </>
    )
}

export default Nvr