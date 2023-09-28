import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
// import "./index.css";
import Papa from "papaparse";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
import noImage from "../../no_Image.jpg";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedHardWare,setFinalData } from "../../app/features/counter/counterSlice";
import { Link } from "react-router-dom";


let globalState;

// Modal-1 Starts
function MyVerticallyCenteredModal(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 1  (Add Product Quantity)
  const [count, setCount] = useState(1);
  const handlePlusClick = () => {
    setCount(count + 1);
  };

  const handleMinusClick = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  // (2) When User Click on Any Box, its values get stored in State
  const [finalNewState, setFinalNewState] = useState({}); // state-1
  React.useEffect(() => {
    setFinalNewState({
      HardWare_Name: props.data.id,
      HardWare_Base_Price: props.data.price,
      HardWare_Quantity: count,
      HardWare_Final_Price : HardWare_Final_Price
    });
  }, [props.data.id, props.data.price, count]);


  // (3)
  const [HardWare_Final_Price, setHardWare_Final_Price] = useState([]);
  const calculateTotalPrice = () => {
    const basePrice = props.data.price;
    const countQuantity = count;
    const countPlusBasePrice = basePrice * count;
    setHardWare_Final_Price(countPlusBasePrice);
  };

  //(4) Adding Two state (my state + finalPrice) into > mergedState
  const [mergedState, setMergedState] = useState({});
  const updateMergedState = () => {
    setMergedState({
      ...finalNewState,
      HardWare_Final_Price,
    });
  };
  React.useEffect(() => {
    updateMergedState();
  }, [finalNewState, HardWare_Final_Price]);

  //(5) Sending State to Redux after "add" button click
  function addSwitchesQuantity() {
    dispatch(setSelectedHardWare(mergedState));
    dispatch(setFinalData(mergedState))
    props.onHide(false); // Modal Close
    
  }
  globalState = mergedState;

  //(6)  Reset the Form

  const resetForm = () => {
    setFinalNewState({});
    setCount(1);
    setHardWare_Final_Price(0);
  };

  React.useEffect(() => {
    if (!props.show) {
      // Modal is closed, reset the form
      resetForm();
    }
  }, [props.show]);


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
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
                  src={props.data.thumbnail === "" ? noImage : ""}
                />
              </Row>
              <Row className="my-2">
                <Col>
                  {" "}
                  <Card.Img
                    variant="top"
                    height={50}
                    src={props.data.image1 === "" ? noImage : ""}
                  />
                </Col>

                <Col>
                  {" "}
                  <Card.Img
                    variant="top"
                    height={50}
                    src={props.data.image2 === "" ? noImage : ""}
                  />
                </Col>
                <Col>
                  {" "}
                  <Card.Img
                    variant="top"
                    height={50}
                    src={props.data.image3 === "" ? noImage : ""}
                  />
                </Col>
              </Row>

              {/* Final Price */}
              <Row>
                <div className="w-100 d-flex align-items-start">
                  <Button variant="dark" onClick={calculateTotalPrice}>
                    Final Price
                  </Button>
                </div>
                <div className="w-100 my-1 d-flex align-items-start">
                  <div className="text">
                    <Table
                      striped
                      bordered
                      hover
                      responsive
                      style={{ width: "14rem" }}
                    >
                      <thead>
                        <tr>
                          <th>
                            <b>$</b>
                            {HardWare_Final_Price}
                          </th>
                        </tr>
                      </thead>
                    </Table>
                  </div>
                </div>
              </Row>
              {/* Final Price */}
            </Col>
            <Col md={8}>
              <p> {props.data.name} </p>

              {/* Add Quantity */}
              <div
                className="d-flex align-items-end justify-content-end my-4"
                style={{ backgroundColor: "" }}
              >
                <Button variant="dark" onClick={handlePlusClick}>
                  +
                </Button>
                <h6 className="mx-3">{count}</h6>
                <Button variant="dark" onClick={handleMinusClick}>
                  -
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="dark" onClick={props.onHide}>
          Back
        </Button>
        {/* <Button variant="dark" onClick={() => navigate("/cameras")} >Add</Button> */}
        <Button variant="dark" onClick={addSwitchesQuantity}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

//Modal Ends

function Hardware() {
  const navigate = useNavigate();
  const selectedCameraNumber = useSelector(
    (state) => state.counter1.totalCamera
  ); // Showing Camera Number Data
  const selectedHardware = useSelector(
    (state) => state.counter1.selectedHardWare
  ); // Showing Switch Details Data
 

  // Modal state-1
  const [modalShow, setModalShow] = React.useState(false);
  const [productCSV, setProductCSV] = useState([]); // ProductCSV Data

  const [data, setData] = useState([]);
  React.useEffect(() => {
    const parseCSVFiles2 = async () => {
      try {
        //Products CSV
        const productsCSV = await fetch("assets/CSVs/products.csv");
        const categoryArray2 = await productsCSV.text();
        const products2 = Papa.parse(categoryArray2, { header: true }).data;
        setProductCSV(products2);
      } catch (error) {
        console.error("Error parsing CSV files:", error);
      }
    };
    parseCSVFiles2();
  }, []);

  // Modal-1 Open
  function handleButtonClick(e, hardware) {
    setModalShow(true);
    setData({
      id: hardware.id,
      name: hardware.name,
      thumbnail: hardware.thumbnail,
      image1: hardware.image1,
      image2: hardware.image2,
      image3: hardware.image3,
      price: hardware.price,
    });
  }

  if (selectedHardware == "") {
    console.log("true");
  } else {
    console.log("false");
  }
  return (
    <>
      <Container fluid className="my-4" style={{ backgroundColor: "" }}>
        <Container>
          <Row style={{ backgroundColor: "" }}>
            <Col style={{ backgroundColor: "" }}>
              <h2>
                Hardware <span className="fst-italic fs-6">(Category)</span>
              </h2>
            </Col>
            {/* Right */}
            <Col className="" style={{ backgroundColor: "" }}>
              <Row>
                <Col className="text-end">
                  Total Number of Cameras:&nbsp;
                  <span className="fw-bold">{selectedCameraNumber}</span>
                </Col>
              </Row>
              <Row>
                <Col className="text-end">
                  <Link to="/">
                    <h6>
                      Edit here <span className="fw-bold"></span>
                    </h6>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Box Row */}
          <Row className="my-4">
            {productCSV.map((hardware) => {
              if (hardware.categories === "Hardware") {
                return (
                  <>
                    <Col
                      style={{ backgroundColor: "" }}
                      md={4}
                      className="nvr_col my-3"
                      onClick={(e) => handleButtonClick(e, hardware)}
                    >
                      <Card style={{ width: "", margin: "" }}>
                        <Card.Body>
                          <Card.Title className="fw-bold">
                            SKU :{hardware.id}
                          </Card.Title>
                          <Card.Text> {hardware.name}</Card.Text>
                          <Row>
                            <Col xs={8}>
                              <Card.Img
                                variant="top"
                                height={150}
                                src={hardware.thumbnail === "" ? noImage : ""}
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
                  </>
                );
              }
            })}
          </Row>

          {/* Table */}

          <Row className="my-4" style={{ padding: "8px" }}>
            <Col>
              <h5 className="fw-bold">Add to Cart: </h5>

              <div className="table-border">
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      {/* <th>#</th>   */}
                      <th>QTY: </th>
                      <th>SKU: </th>
                      <th>Price: </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {/* <td>1</td> */}
                      <td>{selectedHardware.HardWare_Quantity}</td>
                      <td>{selectedHardware.HardWare_Name}</td>
                      <td> {selectedHardware.HardWare_Base_Price}</td>
                    </tr>

                    {/* Final Section */}

                    {selectedHardware == "" ? null : (
                      <tr>
                        <th></th>
                        <td>
                          <b>Total (Price) :</b>
                        </td>
                        <td>
                          <b>${selectedHardware.HardWare_Final_Price}</b>
                        </td>
                      </tr>
                    )}

                    {/* Final Section */}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>

          {/* Button */}
          <Row className="my-4" style={{ backgroundColor: "" }}>
            <Col className="d-flex justify-content-between">
              <Button
                className="poe_next_btn"
                variant="dark"
                onClick={() => navigate("/special")}
              >
                Next
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>
      <MyVerticallyCenteredModal
        show={modalShow}
        data={data}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default Hardware;
