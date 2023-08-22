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

//Modal Starts Here


function MyVerticallyCenteredModal(props) {
  console.log('props aress',props)

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
          {props.modalTitle}
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
                  src={props.modalTitle === 'MicroNVR' ? props.data[0].thumbnail
                    : props.modalTitle === 'MidNVR' ? props.data[1].thumbnail
                      : props.modalTitle === 'PlatinumNVR' ? props.data[2].thumbnail
                        : null}
                />
              </Row>
              <Row className="my-2">
                <Col> <Card.Img
                  variant="top"
                  height={50}
                  src={props.modalTitle === 'MicroNVR' ? props.data[0].thumbnail
                    : props.modalTitle === 'MidNVR' ? props.data[1].thumbnail
                      : props.modalTitle === 'PlatinumNVR' ? props.data[2].thumbnail
                        : null}
                /></Col>
                <Col> <Card.Img
                  variant="top"
                  height={50}
                  src={props.modalTitle === 'MicroNVR' ? props.data[0].thumbnail
                    : props.modalTitle === 'MidNVR' ? props.data[1].thumbnail
                      : props.modalTitle === 'PlatinumNVR' ? props.data[2].thumbnail
                        : null}
                /></Col>
                <Col> <Card.Img
                  variant="top"
                  height={50}
                  src={props.modalTitle === 'MicroNVR' ? props.data[0].thumbnail
                    : props.modalTitle === 'MidNVR' ? props.data[1].thumbnail
                      : props.modalTitle === 'PlatinumNVR' ? props.data[2].thumbnail
                        : null}
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
      <Modal.Footer>

        <div className="w-100 my-4 d-flex align-items-end justify-content-between" >
          <Button className="mx-3" variant="dark" onClick={() => props.onHide(false)}>
            Back
          </Button>
          <Button variant="dark" onClick={() => props.onHide(false)}>
            Add
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
//Modal Ends Here

function Nvr(props) {
  const navigate = useNavigate();
  // Modal Click Button Text Changed
  // Modal State Starts
  const [modalShow, setModalShow] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState([]); // Initialize with a default title
  //Modal State Ends
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);


  React.useEffect(() => {
    const parseCSVFiles = async () => {
      try {
        const productData = await fetch('assets/CSVs/products.csv');
        const productOptionData = await fetch('assets/CSVs/products_options.csv');
        const productArray = await productData.text();
        const productArray2 = await productOptionData.text();
        const products = Papa.parse(productArray, { header: true }).data;
        const products2 = Papa.parse(productArray2, { header: true }).data;
        setData(products) // product data
        setData2(products2) // product_options data

      } catch (error) {
        console.error('Error parsing CSV files:', error);
      }
    };
    parseCSVFiles();
  }, []);

  const handleButtonClick = (e, id, image1) => {
    setModalTitle(id)
    setModalShow(true)
  }

  // Filter Condition
  const targetIds = ['PlatinumNVR', 'MicroNVR', 'MidNVR'];
  const filteredData = data.filter(item => targetIds.includes(item.id));

  // Filter Condition 2
  const targetIds2 = ['57', '58', '59'];
  const filteredData2 = data2.filter(item => targetIds2.includes(item.optionid));

  // Filter Condition 3
  const targetIds3 = ['1956', '1966', '1982'];
  const filteredData3 = data2.filter(item => targetIds3.includes(item.optionid));


  // Warning Modals state
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  // Warning Modals state



  return (
    <>
      <Container fluid className="my-4" style={{ backgroundColor: "" }}>
        <Container>
          <Row style={{ backgroundColor: "" }}>
            <Col style={{ backgroundColor: "" }}>
              <h2>
                NVR Recorders{" "}
                <span className="fst-italic fs-6">(Category)</span>
              </h2>
            </Col>
            {/* Right */}
            <Col className="" style={{ backgroundColor: "" }}>
              <Row>
                <Col className="text-end">
                  Number of Cameras : <span className="fw-bold">??</span>
                </Col>
              </Row>
              <Row>
                <Col className="text-end">
                  <h6>
                    Number of Licenses : <span className="fw-bold">??</span>
                  </h6>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Box Row */}
          <Row className="my-4">
            {
              filteredData.map((val) => {
                return (
                  <Col className="nvr_col" onClick={(e) => handleButtonClick(e, val.id, val.image1)}>
                    <Card style={{ width: "", margin: "" }}>
                      <Card.Body>
                        <Card.Title className="fw-bold">SKU :  {val.id}</Card.Title>
                        <Card.Text>
                          {" "}
                          Description :
                          {val.name}
                        </Card.Text>
                        <Row>
                          <Col xs={8}>
                            <Card.Img
                              variant="top"
                              height={150}
                              src={val.thumbnail}
                            />
                          </Col>
                          <Col
                            xs={4}
                            className="d-flex align-items-center justify-content-center fw-bold"
                          >
                            $ {val.price}
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                )
              })
            }
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              modalTitle={modalTitle}
              data={filteredData}
              data2={filteredData2}
              data3={filteredData3}
            />
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
              <Button variant="dark">Previous</Button>
              <Button variant="dark" onClick={handleShow2}>Next</Button>
            </Col>
          </Row>
        </Container>
      </Container>

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title> <h6> Warning ! Less Licenses than number of cameras</h6> </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to continue</Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose2}>
            Go Back
          </Button>
          <Button variant="dark" onClick={() => navigate("/cameras")}>
            Continue Anyways
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Nvr;
