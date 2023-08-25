import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from 'react-bootstrap/Modal';
// import "./index.css";
import Papa from "papaparse";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from "react-router-dom"
import noImage from '../../no_Image.jpg'


const onlineImageURL = 'https://images.pexels.com/photos/326508/pexels-photo-326508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';


// Modal-1 Starts
function MyVerticallyCenteredModal(props) {
  const navigate = useNavigate();

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
      {
        console.log('props are',props)
      }
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.data.id}
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
                  src={props.data.thumbnail === '' ? noImage : ''}
                />
              </Row>
              <Row className="my-2">
                <Col> <Card.Img
                  variant="top"
                  height={50}
                  src={props.data.image1 === '' ? noImage : ''}
                /></Col>
    
                <Col> <Card.Img
                  variant="top"
                  height={50}
                  src={props.data.image2 === '' ? noImage : ''}
                /></Col>
                <Col> <Card.Img
                  variant="top"
                  height={50}
                  src={props.data.image3 === '' ? noImage : ''}
                /></Col>
              </Row>
            </Col>
            <Col md={8}>
              <p> {props.data.name} </p>
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
        <Button variant="dark" onClick={() => navigate("/cameras")} >Add</Button>
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

function Hardware() {
  const navigate = useNavigate();

  // Modal state-1
  const [modalShow, setModalShow] = React.useState(false);
  // Modal state-2
  const [modalShow2, setModalShow2] = React.useState(false);

  const [produtOption, setProductOptionCSV] = useState([])
  const [productCSV, setProductCSV] = useState([])

  const [data, setData]= useState([])


  React.useEffect(() => {
    const parseCSVFiles2 = async () => {
      try {
        //Products CSV
        const productsCSV = await fetch('assets/CSVs/products.csv');
        const categoryArray2 = await productsCSV.text();
        const products2 = Papa.parse(categoryArray2, { header: true }).data;

        const productsOtionCSV = await fetch('assets/CSVs/products_options.csv');
        const productOption2 = await productsOtionCSV.text();
        const productsOption2 = Papa.parse(productOption2, { header: true }).data;

        setProductCSV(products2)
        setProductOptionCSV(productsOption2)

      } catch (error) {
        console.error('Error parsing CSV files:', error);
      }
    };
    parseCSVFiles2();
  }, []);

  // console.log(productCSV)

  // Modal-1 Open
  function handleButtonClick(e,id,name,thumbnail,image1,image2,image3) {
    // console.log(val)
    setModalShow(true)
      setData({
        id:id,
        name:name,
        thumbnail:thumbnail,
        image1:image1,
        image2:image2,
        image3:image3

      })
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
                Hardware{" "}
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
          {productCSV.map((hardware) => {
            if (hardware.categories === 'Hardware')

            {
              return (
              <>
                  <Col style={{backgroundColor:''}} md={4} className="nvr_col my-3" onClick={(e) => handleButtonClick(e,hardware.id, hardware.name, hardware.thumbnail,hardware.image1,hardware.image2,hardware.image3)}>
                    <Card style={{ width: "", margin: "" }}>
                      <Card.Body>

                        <Card.Title className="fw-bold">SKU :{hardware.id}</Card.Title>
                        <Card.Text>
                          {" "}
                          {hardware.name}
                        </Card.Text>
                        <Row>
                          <Col xs={8}>
                            <Card.Img
                              variant="top"
                              height={150}
                              src={hardware.thumbnail === '' ? noImage : ''}
                            />
                          </Col>
                          <Col
                            xs={4}
                            className="d-flex align-items-center justify-content-center fw-bold"
                          >
                            ${hardware.price}
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>


              </>)

            }
          })}
</Row>

 {/* Button */}
 <Row className="my-4" style={{ backgroundColor: "" }}>
                        <Col className="d-flex justify-content-between">

                            <Button className="poe_next_btn" variant="dark" onClick={()=>navigate('/special')} >Next</Button>
                        </Col>
                    </Row>
        </Container>
      </Container>
      <MyVerticallyCenteredModal
        show={modalShow}
        data={data}
        onHide={() => setModalShow(false)}
      />

      <MyVerticallyCenteredModal2
        show={modalShow2}
        onHide={() => setModalShow2(false)}
      />
    </>
  )
}

export default Hardware