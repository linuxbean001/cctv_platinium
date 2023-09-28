import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Papa from "papaparse";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
import noImage from "../../../src/no_Image.jpg";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedPoE,setFinalData } from "../../app/features/counter/counterSlice";

let globalState;

// Modal-1 Starts
function MyVerticallyCenteredModal(props) {
  const dispatch = useDispatch();

  const [count, setCount] = useState(0);
  // (11) Product Quantity Increaasing/Decreasing Code Starts in Modal-1
  const handlePlusClick = () => {
    setCount(count + 1);
  };

  const handleMinusClick = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  // Product Quantity Increaasing/Decreasing Code Ends

  // (2) When User Click on Any Box, its values get stored in State
  const [finalNewState, setFinalNewState] = useState({}); // state-1
  React.useEffect(() => {
    setFinalNewState({
      Port_Name: props.dataForProduct.id,
      Port_Base_Price: props.dataForProduct.price,
      Port_Quantity: count,
      Extra_Field: props.dataForProduct.extra_field_3,
      poeFinalPrice: poeFinalPrice,
    });
  }, [
    props.dataForProduct.id,
    props.dataForProduct.price,
    count,
    props.dataForProduct.extra_field_3,
  ]);

  // (3)
  const [poeFinalPrice, setPoeFinalPrice] = useState([]);
  const calculateTotalPrice = () => {
    const basePrice = props.dataForProduct.price;
    const countQuantity = count;
    const countPlusBasePrice = basePrice * count;
    setPoeFinalPrice(countPlusBasePrice);
  };

  //(4) Adding Two state (my state + finalPrice) into > mergedState
  const [mergedState, setMergedState] = useState({});
  const updateMergedState = () => {
    setMergedState({
      ...finalNewState,
      poeFinalPrice,
    });
  };
  React.useEffect(() => {
    updateMergedState();
  }, [finalNewState, poeFinalPrice]);

  console.log('xxx',finalNewState)

  //(5) Sending State to Redux after "add" button click
  function addSwitchesQuantity() {
    dispatch(setSelectedPoE(mergedState));
    dispatch(setFinalData(mergedState));
    props.onHide(false); // Modal Close
  }
  globalState = mergedState;

//(6)  Reset the Form

const resetForm = () => {
    setFinalNewState({});
    setCount(1);
    setPoeFinalPrice(0);
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
          Switch :{props.dataForProduct.id}
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
                    props.dataForProduct.thumb
                      ? props.dataForProduct.thumb
                      : noImage
                  }
                />
              </Row>
              <Row className="my-2">
                <Col>
                  {" "}
                  <Card.Img
                    variant="top"
                    height={50}
                    src={props.dataForProduct.img1}
                  />
                </Col>
                <Col>
                  {" "}
                  <Card.Img
                    variant="top"
                    height={50}
                    src={props.dataForProduct.img2}
                  />
                </Col>
                <Col>
                  {" "}
                  <Card.Img
                    variant="top"
                    height={50}
                    src={props.dataForProduct.img3}
                  />
                </Col>
              </Row>

              {/* Final Price */}
              <Row className="my-5">
                <div className="w-100 d-flex align-items-start">
                  <Button variant="dark" onClick={calculateTotalPrice}>
                    Final Price
                  </Button>
                </div>
                <div className="w-100 my-3 d-flex align-items-start">
                  <div>
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
                            <b className="fs-5">${poeFinalPrice}</b>
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
              <p>
                Product Description :{" "}
                {props.dataForProduct.name ? (
                  props.dataForProduct.name
                ) : (
                  <em>No Description found in CSV</em>
                )}
              </p>
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
        <Button variant="dark" onClick={addSwitchesQuantity}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// Modal-2 Starts (Warning Model)
function MyVerticallyCenteredModal2(props) {
  const navigate = useNavigate();
  return (
    <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title>
          {" "}
          <h6> Warning ! There are not enough PoE Ports for cameras</h6>{" "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure want to continue ?</Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="dark" onClick={() => navigate("/hardware")}>
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
  // Product CSV data
  const [productCSV, setProductCSV] = useState([]);

  // Set dataForProduct
  const [dataForProduct, setDataForProduct] = useState([]);
  //product option csv
  const [produtOption, setProductOptionCSV] = useState([]);

  // Redux State
  const selectedCameraNumber = useSelector(
    (state) => state.counter1.totalCamera
  ); // Showing Camera Number Data

  // Modal-2 Open
  function handleButtonClick2(e) {
    setModalShow2(true);
  }

  // Fetching APIs data
  React.useEffect(() => {
    const parseCSVFiles2 = async () => {
      try {
        //Products CSV
        const productsCSV = await fetch("assets/CSVs/products.csv");
        const categoryArray2 = await productsCSV.text();
        const products2 = Papa.parse(categoryArray2, { header: true }).data;

        //Products Options CSV

        const productsOtionCSV = await fetch(
          "assets/CSVs/products_options.csv"
        );
        const productOption2 = await productsOtionCSV.text();
        const productsOption2 = Papa.parse(productOption2, {
          header: true,
        }).data;

        setProductCSV(products2);
        setProductOptionCSV(productsOption2);
      } catch (error) {
        console.error("Error parsing CSV files:", error);
      }
    };
    parseCSVFiles2();
  }, []);

  // Filter Condition

  const poeSwitchData = productCSV.filter((item) => {
    if (item.categories) {
      const categoriesWords = item.categories.split("/");
      return categoriesWords.some((word) => word === "PoE Switches");
    }
    return false;
  });

  // Modal-1 Open
  function handleButtonClick(e, val) {
    setModalShow(true);
    setDataForProduct({
      id: val.id,
      thumb: val.thumbnail,
      img1: val.image1,
      img1: val.image1,
      img2: val.image2,
      img3: val.image3,
      desc: val.description,
      name: val.name,
      price: val.price,
      extra_field_3: val.extra_field_3,
    });
  }

  // Redux
  const selectedNvrDetails = useSelector((state) => state.counter1.selectedPoE); // Showing Switch Details Data

  const tableData = selectedNvrDetails;

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
                  Total Number of Cameras :{" "}
                  {/* <span className="fw-bold">{selectedCameraNumber}</span> */}
                  <span className="fw-bold">10</span>

                </Col>
              </Row>
              {/* <Row>
                <Col className="text-end">
                  <h6>
                    Toal Number of Ports : <span className="fw-bold">?</span>
                  </h6>
                </Col>
              </Row> */}
            </Col>
          </Row>

          {/* Box Row */}
          <Row className="my-4">
            {poeSwitchData.map((val) => {
              return (
                <>
                  <Col
                    md={4}
                    className="nvr_col my-2"
                    onClick={(e) => handleButtonClick(e, val)}
                  >
                    <Card style={{ width: "", margin: "" }}>
                      <Card.Body>
                        <Card.Title className="fw-bold">
                          SKU : {val.id}
                        </Card.Title>
                        <p className="category_para">{val.categories}</p>
                        <Card.Text>
                          {" "}
                          {val.name.substring(0, 60) + "..."}
                        </Card.Text>
                        <Row>
                          <Col xs={8}>
                            <Card.Img
                              variant="top"
                              height={150}
                              src={val.thumbnail ? val.thumbnail : noImage}
                            />
                          </Col>
                          <Col
                            xs={4}
                            className="d-flex align-items-center justify-content-center fw-bold"
                          >
                            ${val.price}
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </>
              );
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
                      <th>#</th> {/* Add a new column for the serial number */}
                      <th>QTY: </th>
                      <th>SKU: </th>
                      <th>Price: </th>
                      <th>Total: </th>
                      <th>PoE Port (Extra Field): </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((val, index) => {
                      return (
                        <>
                          <tr key={val}>
                            <td>{index + 1}</td>{" "}
                            {/* Display the serial number */}
                            <td>{val.Port_Quantity}</td>
                            <td>{val.Port_Name}</td>
                            <td> $ {val.Port_Base_Price} / pcs</td>
                            <td> $ {val.poeFinalPrice} </td>
                            <td> {val.Extra_Field} </td>
                          </tr>
                        </>
                      );
                    })}
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
                onClick={(e) => handleButtonClick2(e)}
              >
                Next
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>

      <MyVerticallyCenteredModal
        show={modalShow}
        dataForProduct={dataForProduct}
        onHide={() => setModalShow(false)}
      />

      {/* Warning Model */}
      <MyVerticallyCenteredModal2
        show={modalShow2}
        onHide={() => setModalShow2(false)}
      />
    </>
  );
}

export default PoeSwitches;
