import React, { useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import "./index.css";
import Papa from "papaparse";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';

//Modal Starts Here


function MyVerticallyCenteredModal(props) {

  const [count, setCount] = useState(0);

  const addNvrCart = () => {
    props.state({
      sku: props.modalTitle,
      quantity: count,
      price: props.data[0].price,
      // description:props.data[0].description
    });
    props.onHide(false);
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
                  src={
                    props.modalTitle === "MicroNVR"
                      ? props.data[0].thumbnail
                      : props.modalTitle === "MidNVR"
                        ? props.data[1].thumbnail
                        : props.modalTitle === "PlatinumNVR"
                          ? props.data[2].thumbnail
                          : null
                  }
                />
              </Row>
              <Row className="my-2">
                <Col>
                  {" "}
                  <Card.Img
                    variant="top"
                    height={50}
                    className="camera_thumbnail_img"
                    src={
                      props.modalTitle === "MicroNVR"
                        ? props.data[0].thumbnail
                        : props.modalTitle === "MidNVR"
                          ? props.data[1].thumbnail
                          : props.modalTitle === "PlatinumNVR"
                            ? props.data[2].thumbnail
                            : null
                    }
                  />
                </Col>
                <Col>
                  {" "}
                  <Card.Img
                    variant="top"
                    height={50}
                    className="camera_thumbnail_img"
                    src={
                      props.modalTitle === "MicroNVR"
                        ? props.data[0].thumbnail
                        : props.modalTitle === "MidNVR"
                          ? props.data[1].thumbnail
                          : props.modalTitle === "PlatinumNVR"
                            ? props.data[2].thumbnail
                            : null
                    }
                  />
                </Col>
                <Col>
                  {" "}
                  <Card.Img
                    variant="top"
                    height={50}
                    className="camera_thumbnail_img"
                    src={
                      props.modalTitle === "MicroNVR"
                        ? props.data[0].thumbnail
                        : props.modalTitle === "MidNVR"
                          ? props.data[1].thumbnail
                          : props.modalTitle === "PlatinumNVR"
                            ? props.data[2].thumbnail
                            : null
                    }
                  />
                </Col>
              </Row>
            </Col>
            <Col md={8}>
              <p>
                Description: Lorem, ipsum dolor sit amet consectetur adipisicing
                elit. Autem, corrupti?
              </p>
              <p className="fw-bold">
                Choose Options :
              </p>
              {/* Options */}

              <Form.Select aria-label="Default select example" className="mb-3">
                <option> CPU :</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>

                    {/* Select RAM */}
              <Form.Select aria-label="Default select example" className="mb-3">
                <option> RAM :</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>

                 {/* Select M2 Drive */}
                 <Form.Select aria-label="Default select example" className="mb-3">
                <option> M2 Drive :</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>

                {/* Select Licenses */}
                <Form.Select aria-label="Default select example" className="mb-3">
                <option> Licenses :</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>

                   {/* Hard Drive Sizes */}
                   <Form.Select aria-label="Default select example" className="mb-3">
                <option> Hard Drive Sizes :</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>

              <div
                className="d-flex align-items-end justify-content-end my-4"
                style={{ backgroundColor: "" }}
              >
                <Button variant="dark" onClick={() => setCount(count + 1)}>
                  +
                </Button>
                <h6 className="mx-3">{count}</h6>
                <Button variant="dark" onClick={() => count > 0 ? setCount(count - 1) : null}>
                  -
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <div className="w-100 my-4 d-flex align-items-end justify-content-between">
          <Button
            className="mx-3"
            variant="dark"
            onClick={() => props.onHide(false)}
          >
            Back
          </Button>
          <Button variant="dark" onClick={addNvrCart}>
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
  const [modalShow, setModalShow] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState([]); // Initialize with a default title
  const [data, setData] = useState([]);  // product.csv data
  const [data2, setData2] = useState([]); // product_options.csv data
  const [addCart, setAddCart] = useState([]);

  React.useEffect(() => {
    const parseCSVFiles = async () => {
      try {
        const productData = await fetch("assets/CSVs/products.csv");
        const productOptionData = await fetch(
          "assets/CSVs/products_options.csv"
        );
        const productArray = await productData.text();
        const productArray2 = await productOptionData.text();
        const products = Papa.parse(productArray, { header: true }).data;
        const products2 = Papa.parse(productArray2, { header: true }).data;
        setData(products); // product data
        setData2(products2); // product_options data
      } catch (error) {
        console.error("Error parsing CSV files:", error);
      }
    };
    parseCSVFiles();
  }, []);

  const handleButtonClick = (e, id, image1, val) => {
    setModalTitle(id, val);
    setModalShow(true);
  };

  // Filter Condition
  const targetIds = ["PlatinumNVR", "MicroNVR", "MidNVR"];
  const filteredData = data.filter((item) =>
    targetIds.includes(item.id));

  // Filter Condition 2
  const targetIds2 = ["57", "58", "59"];
  const filteredData2 = data2.filter((item) =>
    targetIds2.includes(item.optionid)

  );
  // console.log('my filter data', filteredData2)

  // Filter Condition 3
 const filteredData3 = data2.filter(item => item.catalogid === '75').sort((a, b) => a.sorting - b.sorting)
console.log('uyyy',filteredData3)
  // Warning Modals state
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  // Warning Modals state
  // Create an object to track unique camera numbers and their corresponding index
  const cameraNumberMap = {};
  props.userDetail.forEach((item, index) => {
    if (item.cameraNumber !== undefined) {
      if (cameraNumberMap[item.cameraNumber] !== undefined) {
        // Update the existing object with the new cameraNumber
        props.userDetail[cameraNumberMap[item.cameraNumber]].cameraNumber =
          item.cameraNumber;
      } else {
        // Store the index for the cameraNumber
        cameraNumberMap[item.cameraNumber] = index;
      }
    }
  });

  // Filter the array to remove duplicates
  const uniqueArray = props.userDetail.filter(
    (item, index) => cameraNumberMap[item.cameraNumber] === index
  );
  const lastIndex = uniqueArray.length - 1;


  // console.log('data first',data2)

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
              {uniqueArray.map((item, index) => {
                if (index === lastIndex) {
                  return (
                    <Row key={index}>
                      <Col className="text-end">
                        Number of Cameras:{" "}
                        <span className="fw-bold">{item.cameraNumber}</span>
                      </Col>
                    </Row>
                  );
                }
                return null;
              })}

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
            {filteredData.map((val) => {
              return (
                <Col
                  className="nvr_col"
                  onClick={(e) => handleButtonClick(e, val.id, val.image1, val)}
                >
                  <Card style={{ width: "", margin: "" }}>
                    <Card.Body>
                      <Card.Title className="fw-bold">
                        SKU : {val.id}
                      </Card.Title>
                      <Card.Text> Description :{val.name}</Card.Text>
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
              );
            })}
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              modalTitle={modalTitle}
              data={filteredData}
              data2={filteredData2}
              data3={filteredData3}
              state={setAddCart}
              setRedux={props}
            />
          </Row>
          {/* Table */}
          <Row className="my-4" style={{ padding: "8px" }}>
            <Col style={{}}>
              <div className="table-border">
                <Table striped hover>
                  <thead></thead>
                  <tbody>
                    {" "}
                    <tr>
                      {" "}
                      <td>Adding to Cart</td> <td>QTY</td> <td>SKU</td>{" "}
                      <td>Description</td> <td>Total:</td> <td>Licenses:</td>{" "}
                    </tr>{" "}
                    <tr>
                      {" "}
                      <td></td> <td>{addCart.quantity}</td> <td>{addCart.sku}</td> <td>Description</td>{" "}
                      <td>Total: {addCart.price * addCart.quantity} </td> <td>Licenses:</td>{" "}
                    </tr>{" "}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>

          {/* Button */}
          <Row className="my-4" style={{ backgroundColor: "" }}>
            <Col className="d-flex justify-content-between">
              <Button variant="dark">Previous</Button>
              <Button variant="dark" onClick={handleShow2}>
                Next
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <h6> Warning ! Less Licenses than number of cameras</h6>{" "}
          </Modal.Title>
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
