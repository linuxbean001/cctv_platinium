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

// Redux
import { useSelector, useDispatch } from "react-redux";




//Modal Starts Here


function MyVerticallyCenteredModal(props) {

  const [count, setCount] = useState(0);

  const addNvrCart = () => {
    // props.state({
    //   sku: props.modalTitle,
    //   quantity: count,
    //   price: props.data[0].price,
    //   // description:props.data[0].description
    // });
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
          {props.dataforProduct.id}
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
                    props.dataforProduct.thumbnail
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
                      props.dataforProduct.image1
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
                      props.dataforProduct.image2

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
                      props.dataforProduct.image3
                    }
                  />
                </Col>
              </Row>
            </Col>
            <Col md={8}>
              <p>
                Description: {props.dataforProduct.description ? props.dataforProduct.description : 'No Description found'}
              </p>
              <p className="fw-bold">
                Choose Options :
              </p>
              {/* Options */}

              {
                props.finalData.map((item, index) => {
                  return (
                    <>
                      <Form.Select key={index} aria-label="Default select example" className="mb-3">
                        <option value={2}>{item[0].featurecaption}</option>
                        {item.map((option, optionIndex) => (
                          <option key={optionIndex} value={option.value}>
                            {option.featurename}
                          </option>
                        ))}
                      </Form.Select>


                    </>
                  )
                })
              }

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
  // Redux
  const countCamera = useSelector((state) => state.counter1);


  const navigate = useNavigate();
  const [modalShow, setModalShow] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState([]); // Initialize with a default title
  const [productCSV, setProductCSV] = useState([]);  // product.csv data
  const [produtOption, setProductOptionCSV] = useState([]); // product_options.csv data
  const [addCart, setAddCart] = useState([]);

  // Sending Filter Data in a state
  const [recorderFilter, setRecorderFilter] = useState([])

  // dataforProduct data from other csv
  const [dataforProduct, setdataForProduct] = useState([])

  // for id
  const [idforOptions, setIdforOptions] = useState([])

  // extra
  const [extra, setExtra] = useState([])

  // by sir
  const [finalData, setFinalData] = useState([])

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
        setProductCSV(products);    // product csv data
        setProductOptionCSV(products2);  // product_options data
      } catch (error) {
        console.error("Error parsing CSV files:", error);
      }
    };
    parseCSVFiles();
  }, []);



  // Warning Modals state
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  // Warning Modals state

  // It'll search for NVR from ProductCSV (only from column "id") and Sending Filter Data in a state
  const recorderData = productCSV.filter((item) => {
    return item.id && item.id.includes('NVR');
  });

  // Data coming from Product_Option csv below and apply a filter condition

  const recorderData2 = produtOption.filter((item) => {
    return item.productid && item.productid.includes('NVR');
  });

  // Box Button Click

  const handleButtonClick = (e, val, id) => {

    let firstIndex = -1;
    let lastIndex = -1;
    // Find the index of the first '83' value and the index of the last '83' value
    for (let i = 0; i < produtOption.length; i++) {
      if (produtOption[i].productid === id && firstIndex === -1) {
        firstIndex = i;
      }
      if (produtOption[i].productid === id) {
        lastIndex = i;
      }
    }
    if (firstIndex !== -1 && lastIndex !== -1) {
      const valuesBetween = [];
      for (let i = firstIndex; i <= lastIndex; i++) {
        if (produtOption[i].productid === id || produtOption[i].productid === '') {
          valuesBetween.push(produtOption[i]);
        }
      }
      const separatedArrays = [];
      let currentArray = [];
      valuesBetween.forEach(item => {
        if (item.optionid !== '') {
          if (currentArray.length > 0) {
            separatedArrays.push([...currentArray]);
            currentArray = [];
          }
        }
        currentArray.push(item);
      });
      if (currentArray.length > 0) {
        separatedArrays.push([...currentArray]);
      }
      setFinalData(separatedArrays)
    } else {
      console.log("No suitable data found in the data array with '83' cateId.");
    }

    setIdforOptions(id)
    setModalShow(true);
    setRecorderFilter(recorderData)
    setdataForProduct({
      id: val.id,
      image1: val.image1,
      image2: val.image2,
      image3: val.image3,
      thumbnail: val.thumbnail,
      description: val.description
    })
    setExtra(isIdInRecorderData2)


  };

  console.log('first')
  const isIdInRecorderData2 = recorderData2.filter((item) => {
    if (item.productid == idforOptions) {
      return idforOptions.includes(item.productid)
    }

  });

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
                  Number of Cameras:
                  <span className="fw-bold">{countCamera.totalCamera}</span>
                </Col>
              </Row>
              <Row>
                <Col className="text-end">
                  Number of Options:
                  <span className="fw-bold">{countCamera.totalOptions}</span>
                </Col>
              </Row>
              <Row>
                <Col className="text-end">
                  <h6>
                    Number of Licenses : <span className="fw-bold">{countCamera.totalCamera}</span>
                  </h6>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Box Row */}
          <Row className="my-4">
            {
              recorderData.map((val) => {
                return (
                  <>
                    <Col md={4}
                      className="nvr_col my-3"
                      onClick={(e) => handleButtonClick(e, val, val.id)}
                    >
                      <Card style={{ width: "", margin: "" }}>
                        <Card.Body>
                          <Card.Title className="fw-bold">
                            SKU : {val.id}
                          </Card.Title>
                          <Card.Text> Description : {val.name}</Card.Text>
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
                  </>
                )
              })
            }


            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              modalTitle={modalTitle}
              dataforProduct={dataforProduct}
              finalData={finalData}
              extra={extra}
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
